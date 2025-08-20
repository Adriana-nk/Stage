import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginHeaderComponent } from '../../components/login-header/login-header.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginFooterComponent } from '../../components/login-footer/login-footer.component';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, LoginHeaderComponent, LoginFormComponent, LoginFooterComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  // Méthode appelée par le composant <app-login-form> via l'événement (login)
  onLogin(credentials: { email: string; password: string }) {
    this.authService.login(credentials.email, credentials.password).subscribe({
      next: async (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          await this.showToast('Connexion réussie ✅', 'success');
          this.router.navigate(['/home']);
        } else {
          await this.showToast(res.message || 'Identifiants incorrects', 'danger');
        }
      },
      error: async () => {
        await this.showToast('Erreur lors de la connexion', 'danger');
      }
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}

