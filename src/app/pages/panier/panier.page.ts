import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { AcheteurFooterComponent } from 'src/app/components/acheteur-footer/acheteur-footer.component';

export interface CartItem {
  id: number;
  name: string;
  weight: string;
  price: number;
  pricePerUnit: number;
  unit: string;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AcheteurFooterComponent]
})
export class PanierPage implements OnInit {
  searchTerm: string = '';
  cartItems: CartItem[] = [
    { id: 1, name: 'Haricot vert', weight: '4kg', price: 1000, pricePerUnit: 250, unit: 'kg', quantity: 4, image: 'assets/images/haricot-vert.jpg' },
    { id: 2, name: 'Maïs sec', weight: '2kg', price: 1400, pricePerUnit: 700, unit: 'kg', quantity: 2, image: 'assets/images/mais-sec.jpg' },
    { id: 3, name: 'Pomme de terre', weight: '15kg', price: 18000, pricePerUnit: 1200, unit: 'kg', quantity: 15, image: 'assets/images/pomme-de-terre.jpg' },
    { id: 4, name: 'Choux vert', weight: '12', price: 3000, pricePerUnit: 250, unit: 'unité', quantity: 12, image: 'assets/images/choux-vert.jpg' }
  ];
  filteredCartItems: CartItem[] = [];

  constructor(private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit() {
    this.filteredCartItems = [...this.cartItems];
  }

  onSearchInput(event: any) {
    const query = (event?.target?.value || '').toLowerCase().trim();
    this.searchTerm = query;
    this.filteredCartItems = query ? this.cartItems.filter(item => item.name.toLowerCase().includes(query)) : [...this.cartItems];
  }

  increaseQuantity(itemId: number) {
    const item = this.cartItems.find(it => it.id === itemId);
    if (item) { item.quantity++; this.updateItemPrice(item); this.updateFilteredItems(); }
  }

  decreaseQuantity(itemId: number) {
    const item = this.cartItems.find(it => it.id === itemId);
    if (item && item.quantity > 1) { item.quantity--; this.updateItemPrice(item); this.updateFilteredItems(); }
    else if (item && item.quantity === 1) { this.confirmRemoveItem(itemId); }
  }

  private updateItemPrice(item: CartItem) {
    item.price = item.pricePerUnit * item.quantity;
    item.weight = item.unit === 'kg' ? `${item.quantity}kg` : `${item.quantity}`;
  }

  private updateFilteredItems() {
    this.filteredCartItems = this.searchTerm ? this.cartItems.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase())) : [...this.cartItems];
  }

  async confirmRemoveItem(itemId: number) {
    const item = this.cartItems.find(it => it.id === itemId);
    if (!item) return;
    const alert = await this.alertController.create({
      header: "Supprimer l'article",
      message: `Voulez-vous vraiment supprimer "${item.name}" de votre panier ?`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Supprimer', role: 'destructive', handler: () => this.removeItem(itemId) }
      ]
    });
    await alert.present();
  }

  async removeItem(itemId: number) {
    const index = this.cartItems.findIndex(it => it.id === itemId);
    if (index > -1) {
      const removed = this.cartItems[index];
      this.cartItems.splice(index, 1);
      this.updateFilteredItems();
      const toast = await this.toastController.create({
        message: `${removed.name} supprimé du panier`,
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, it) => total + it.price, 0);
  }

  async proceedToPayment() {
    if (this.cartItems.length === 0) {
      const toast = await this.toastController.create({
        message: 'Votre panier est vide',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Procéder au paiement',
      message: `Total à payer : ${this.getTotalPrice()} FCFA`,
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Confirmer', handler: () => this.processPayment() }
      ]
    });
    await alert.present();
  }

  private async processPayment() {
    const toast = await this.toastController.create({ message: 'Paiement en cours...', duration: 1500, position: 'bottom', color: 'primary' });
    await toast.present();

    setTimeout(async () => {
      const successToast = await this.toastController.create({ message: 'Paiement effectué avec succès !', duration: 3000, position: 'bottom', color: 'success' });
      await successToast.present();
      this.cartItems = [];
      this.filteredCartItems = [];
    }, 1500);
  }

  navigateToTab(tab: string) { console.log(`Navigation vers l'onglet: ${tab}`); }
}
