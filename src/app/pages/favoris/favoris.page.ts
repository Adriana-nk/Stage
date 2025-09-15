import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { FavorisService } from './service/favoris';
import { Produit } from 'src/app/services/product.service';
import { AcheteurFooterComponent } from 'src/app/components/acheteur-footer/acheteur-footer.component';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, AcheteurFooterComponent]
})
export class FavorisPage implements OnInit {
  favoris: Produit[] = [];

  constructor(
    private favorisService: FavorisService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loadFavoris();
  }

  async loadFavoris() {
  try {
    const favs = await firstValueFrom(this.favorisService.getFavorites());
    this.favoris = favs.map(p => ({ ...p, favori: true }));
    console.log(this.favoris); // vérifier que favori = true pour chaque produit
  } catch (error: any) {
    console.error('Erreur lors du chargement des favoris', error.error?.message || error);
    this.showToast('Impossible de charger les favoris', 'danger');
  }
}

  async removeFavoris(produit: Produit) {
    try {
      await firstValueFrom(this.favorisService.toggleFavorite(produit.id));
      this.favoris = this.favoris.filter(p => p.id !== produit.id);
      this.showToast(`${produit.nom} a été retiré des favoris`, 'success');
    } catch (error: any) {
      console.error('Erreur lors de la suppression du favori', error.error?.message || error);
      this.showToast('Impossible de retirer le produit des favoris', 'danger');
    }
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  } toggleFavoris(produit: Produit) {
    this.removeFavoris(produit);
  }

}
