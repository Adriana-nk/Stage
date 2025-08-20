import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { Inscription1FormService } from './Service/inscription1.service';

@Component({
  selector: 'app-inscription1-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './inscription1-form.component.html',
  styleUrls: ['./inscription1-form.component.scss']
})
export class Inscription1FormComponent {
  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  genre: string = '';
  region?: string;
  ville?: string;
  profil?: string;
  email?: string;
  password: string = '';

  constructor(
    private inscriptionService: Inscription1FormService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  submit() {
    const data = {
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
      genre: this.genre,
      region: this.region,
      ville: this.ville,
      profil: this.profil,
      email: this.email,
      password: this.password
    };

    this.inscriptionService.register(data).subscribe({
      next: async (res) => {
        // ✅ Vérifie que l'inscription a bien réussi
        if (res.success) {
          const toast = await this.toastController.create({
            message: 'Inscription réussie ! Veuillez vous connecter.',
            duration: 2000,
            color: 'success', // ✅ Couleur verte
            position: 'top'
          });
          await toast.present();

          // ✅ Redirection vers login
          this.navCtrl.navigateRoot('/login');
        } else {
          let errorMsg = res.message || 'Erreur lors de l\'inscription';
          if (res.errors && typeof res.errors === 'object') {
            const allErrors = ([] as string[]).concat(...Object.values(res.errors));
            errorMsg = allErrors.join(' \n ');
          }
          const toast = await this.toastController.create({
            message: errorMsg,
            duration: 4000,
            color: 'danger', // Couleur rouge pour erreur
            position: 'top'
          });
          await toast.present();
        }
      },
      error: async (err) => {
        let errorMsg = 'Erreur réseau ou serveur';
        if (err.error && err.error.message) {
          errorMsg = err.error.message;
        } else if (err.message) {
          errorMsg = err.message;
        }
        const toast = await this.toastController.create({
          message: errorMsg,
          duration: 4000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }
}
