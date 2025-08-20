// acheteur-footer.component.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acheteur-footer',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './acheteur-footer.component.html',
  styleUrls: ['./acheteur-footer.component.scss'],
})
export class AcheteurFooterComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/accueil']); // <-- route de la page d'accueil
  }

  goToFavoris() {
    this.router.navigate(['/favoris']); 
  }

  goToCart() {
    this.router.navigate(['/panier']); 
  }
}
