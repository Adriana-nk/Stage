import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Inscription2FormService } from './Service/inscription2.service'; // <-- adapte le chemin

@Component({
  selector: 'app-inscription2-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './inscription2-form.component.html',
  styleUrls: ['./inscription2-form.component.scss']
})
export class Inscription2FormComponent {
  // Champs obligatoires
  nom = '';
  prenom = '';
  telephone = '';
  genre = '';

  // Champs supplémentaires
  region = '';
  ville = '';
  profil = '';
  email = '';

  constructor(
    private inscriptionService: Inscription2FormService,
    private router: Router
  ) {}

  submit() {
    const data = {
      nom: this.nom || '',
      prenom: this.prenom || '',
      telephone: this.telephone || '',
      genre: this.genre || '',
      region: this.region || '',
      ville: this.ville || '',
      profil: this.profil || '',
      email: this.email || ''
    };

    this.inscriptionService.register(data).subscribe({
      next: (res: any) => {
        console.log('Inscription réussie', res);
        // Exemple : redirection
        // this.router.navigate(['/confirmation']);
      },
      error: (err: any) => {
        console.error('Erreur inscription', err);
      }
    });
  }
}
