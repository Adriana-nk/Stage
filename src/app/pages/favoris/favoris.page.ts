import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FavorisService, Produit } from 'src/app/pages/favoris/Service/favoris.service';
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
  userId: number = 1; // Remplace par l'ID de l'utilisateur connecté

  constructor(
    private favorisService: FavorisService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadFavoris();
  }

  /**
   * Charger les favoris depuis le back-end
   */
  loadFavoris() {
    this.favorisService.getFavoris(this.userId).subscribe({
      next: (data: Produit[]) => {
        this.favoris = data;
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Erreur lors du chargement des favoris',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  /**
   * Confirmer la suppression d’un favori
   */
  async confirmRemoveFavoris(item: Produit) {
    const alert = await this.alertController.create({
      header: 'Supprimer le favori',
      message: `Voulez-vous vraiment retirer "${item.name}" de vos favoris ?`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Supprimer', role: 'destructive', handler: () => this.removeFavoris(item) }
      ]
    });
    await alert.present();
  }

  /**
   * Supprimer un favori
   */
  removeFavoris(item: Produit) {
    this.favorisService.removeFromFavoris(this.userId, item.id).subscribe({
      next: async () => {
        this.favoris = this.favoris.filter(f => f.id !== item.id);
        const toast = await this.toastController.create({
          message: `${item.name} supprimé des favoris`,
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Impossible de supprimer le favori',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
