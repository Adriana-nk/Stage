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

onLogin(credentials: { email: string; password: string }) {
  console.log('LoginPage - credentials reçus:', credentials);

  this.authService.login(credentials.email, credentials.password).subscribe({
    next: async (res: any) => {   // res est de type "any" pour pouvoir accéder à res.data
      console.log('LoginPage - réponse login:', res);

      if (res.data?.access_token) {
        const token = res.data.access_token;
        const user = res.data.user;

        // Stockage
        localStorage.setItem('auth_token', token);
        console.log('Token stocké dans localStorage:', token);

        await this.showToast('Connexion réussie ✅', 'success');

        // Redirection vers la page acheteur
        this.router.navigate(['/acheteur']);
      } else {
        console.log('Login échoué:', res.message);
        await this.showToast(res.message || 'Identifiants incorrects', 'danger');
      }
    },
    error: async (err) => {
      console.error('Erreur subscription login:', err);
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
