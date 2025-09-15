import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { AcheteurFooterComponent } from 'src/app/components/acheteur-footer/acheteur-footer.component';
import { PanierService, CartItem, ResponseType } from './service/panier';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AcheteurFooterComponent]
})
export class PanierPage implements OnInit {
  searchTerm = '';
  cartItems: CartItem[] = [];
  filteredCartItems: CartItem[] = [];

  constructor(
    private panierService: PanierService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.panierService.getCart().subscribe({
      next: (res: ResponseType<CartItem[]>) => {
        if(res.code === 200 && Array.isArray(res.data)) {
          this.cartItems = res.data;
        } else {
          this.cartItems = [];
        }
        this.updateFilteredItems();
      },
      error: async () => {
        this.cartItems = [];
        this.updateFilteredItems();
        const toast = await this.toastController.create({
          message: 'Erreur lors du chargement du panier',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  onSearchInput(event: any) {
    this.searchTerm = (event?.target?.value || '').toLowerCase().trim();
    this.updateFilteredItems();
  }

  increaseQuantity(item: CartItem) {
    this.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) this.updateQuantity(item, item.quantity - 1);
    else this.confirmRemoveItem(item);
  }

  private updateQuantity(item: CartItem, quantity: number) {
    this.panierService.updateQuantity(item.product_id, quantity).subscribe({
      next: (res: ResponseType<CartItem[]>) => {
        if(res.code === 200 && Array.isArray(res.data)) {
          this.cartItems = res.data;
          this.updateFilteredItems();
        }
      }
    });
  }

  async confirmRemoveItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Supprimer l\'article',
      message: `Voulez-vous supprimer "${item.product_name}" du panier ?`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Supprimer', role: 'destructive', handler: () => this.removeItem(item) }
      ]
    });
    await alert.present();
  }

  removeItem(item: CartItem) {
    this.panierService.removeFromCart(item.product_id).subscribe({
      next: (res: ResponseType<CartItem[]>) => {
        if(res.code === 200 && Array.isArray(res.data)) {
          this.cartItems = res.data;
          this.updateFilteredItems();
        }
      }
    });
  }

  private updateFilteredItems() {
    this.filteredCartItems = this.searchTerm
      ? this.cartItems.filter(item => (item.product_name?.toLowerCase() || '').includes(this.searchTerm))
      : [...this.cartItems];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, it) => total + (it.price || 0) * it.quantity, 0);
  }

  async proceedToPayment() {
    if (this.cartItems.length === 0) return;
    const alert = await this.alertController.create({
      header: 'Procéder au paiement',
      message: `Total : ${this.getTotalPrice()} FCFA`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Confirmer', handler: () => this.processPayment() }
      ]
    });
    await alert.present();
  }

  private async processPayment() {
    const toast = await this.toastController.create({
      message: 'Paiement en cours...',
      duration: 1500,
      color: 'primary'
    });
    await toast.present();

    setTimeout(async () => {
      const successToast = await this.toastController.create({
        message: 'Paiement effectué avec succès !',
        duration: 3000,
        color: 'success'
      });
      await successToast.present();

      this.cartItems = [];
      this.filteredCartItems = [];
    }, 1500);
  }
}
