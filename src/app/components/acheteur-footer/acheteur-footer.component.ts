import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-acheteur-footer',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './acheteur-footer.component.html',
  styleUrls: ['./acheteur-footer.component.scss'],
})
export class AcheteurFooterComponent {
  activeTab: string = 'Accueil';

  constructor(private router: Router) {}

  /** Change l’onglet actif et redirige */
  navigate(tab: string, route: string) {
    this.activeTab = tab;
    this.router.navigate([route]); // redirection Angular
  }
}
