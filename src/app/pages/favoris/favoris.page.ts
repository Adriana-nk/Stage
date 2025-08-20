

import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavorisService, Produit } from 'src/app/services/favoris.service';
import { RouterModule, Router } from '@angular/router';
import { AcheteurFooterComponent } from 'src/app/components/acheteur-footer/acheteur-footer.component';
@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NgIf,
    NgFor,
    RouterModule,
    AcheteurFooterComponent
  ],
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage {
  favoris: Produit[] = [];

  constructor(private favorisService: FavorisService, private router: Router) {
    this.favoris = this.favorisService.getFavoris();
  }

  retirerFavori(produit: Produit) {
    this.favorisService.retirerFavori(produit);
    this.favoris = this.favorisService.getFavoris();
  }

  goToAccueil() {
    this.router.navigate(['/acheteur.page']);
  }
}
