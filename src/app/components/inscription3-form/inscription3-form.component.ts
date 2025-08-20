import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Inscription3FormService } from './Service/inscription3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription3-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './inscription3-form.component.html',
  styleUrls: ['./inscription3-form.component.scss']
})
export class Inscription3FormComponent {
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  acceptedConditions = false;

  constructor(
    private inscriptionService: Inscription3FormService,
    private router: Router,
    private toastController: ToastController
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  submit() {
    if (this.password !== this.confirmPassword) {
      this.showToast('Les mots de passe ne correspondent pas');
      return;
    }

    if (!this.acceptedConditions) {
      this.showToast('Vous devez accepter les conditions');
      return;
    }

    const data = { password: this.password };

    this.inscriptionService.register(data).subscribe({
      next: async (res: any) => {
        await this.showToast('Inscription réussie', 'success');
        // Redirection après succès
        this.router.navigate(['/confirmation']);
      },
      error: async (err: any) => {
        await this.showToast('Erreur lors de l\'inscription');
      }
    });
  }
}
