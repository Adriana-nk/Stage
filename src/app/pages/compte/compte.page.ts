import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AcheteurFooterComponent } from 'src/app/components/acheteur-footer/acheteur-footer.component';

interface UserProfile {
  nom: string;
  prenom: string;
  email: string;
  photo?: string;
  telephone?: string;
  adresse?: string;
}

interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  location: boolean;
}

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AcheteurFooterComponent]
})
export class ComptePage implements OnInit {
  userProfile: UserProfile = {
    nom: 'NKOUAYA',
    prenom: 'NGOKO',
    email: 'adrianacosby42@gmail.com',
    photo: '',
    telephone: '697050058',
    adresse: 'Simbock,Yaoundé'
  };

  appSettings: AppSettings = {
    notifications: true,
    darkMode: false,
    language: 'Français',
    location: true
  };

  constructor(
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit(): void {}

  async changeProfilePhoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Changer la photo de profil',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera',
          handler: () => this.takePhoto(CameraSource.Camera)
        },
        {
          text: 'Choisir depuis la galerie',
          icon: 'image',
          handler: () => this.takePhoto(CameraSource.Photos)
        },
        { text: 'Annuler', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }

  async takePhoto(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source
      });
      this.userProfile.photo = image.dataUrl;
      const toast = await this.toastCtrl.create({
        message: 'Photo mise à jour avec succès',
        duration: 1500,
        color: 'success'
      });
      await toast.present();
    } catch (error) {
      console.error('Erreur photo :', error);
    }
  }

  editField(field: keyof UserProfile) { console.log('Editer', field); }
  updateSetting(setting: keyof AppSettings, event: any) { (this.appSettings as any)[setting] = event.detail?.checked ?? event; }
  changeLanguage() { console.log('Changer langue'); }
  changePassword() { console.log('Changer mot de passe'); }
  viewOrderHistory() { console.log('Voir historique commandes'); }
  contactSupport() { console.log('Contacter support'); }
  viewPrivacyPolicy() { console.log('Voir politique confidentialité'); }
  logout() { console.log('Déconnexion'); }
  navigateToTab(tab: string) { console.log('Naviguer vers', tab); }
}
