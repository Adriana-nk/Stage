import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../../pages/login/Service/auth.service';

@Component({
  selector: 'app-inscription1-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './inscription1-form.component.html',
  styleUrls: ['./inscription1-form.component.scss']
})
export class Inscription1FormComponent {
  nom = '';
  prenom = '';
  telephone = '';
  genre = '';
  region = '';
  ville = '';
  profil = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async submit() {
    if (!this.email || !this.password) {
      await this.showToast('Email et mot de passe sont requis', 'danger');
      return;
    }

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

    this.authService.register(data).subscribe({
      next: async (res: any) => {
        if (res.data) {
          await this.showToast('Inscription réussie ! Veuillez vous connecter.', 'success');
          this.navCtrl.navigateRoot('/login');
        } else {
          let errorMsg = res.message || 'Erreur lors de l\'inscription';
          if (res.errors) {
            const allErrors: string[] = [];
            Object.keys(res.errors).forEach(key => {
              allErrors.push(...(res.errors[key] as string[]));
            });
            errorMsg = allErrors.join(' \n ');
          }
          await this.showToast(errorMsg, 'danger');
        }
      },
      error: async (err) => {
        const errorMsg = err.error?.message || err.message || 'Erreur réseau ou serveur';
        await this.showToast(errorMsg, 'danger');
      }
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
