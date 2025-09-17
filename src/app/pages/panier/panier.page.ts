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
    // Souscription pour mises à jour automatiques
    this.panierService.panier$.subscribe(items => {
      this.cartItems = items || [];
      this.updateFilteredItems();
    });
    this.loadCart();
  }
loadCart() {
  this.panierService.getCart().subscribe({
    next: (res: ResponseType<CartItem[]>) => {
      if (res.code === 200) {
        this.cartItems = Array.isArray(res.data) ? res.data : [];
      } else {
        this.cartItems = [];
      }

      // Convertir price et quantity en nombres pour éviter les erreurs
      this.cartItems = this.cartItems.map(item => {
        const price = Number(item.prix ?? 0);
        const quantity = Number(item.quantity ?? 0);

        // Log pour debug chaque item
        console.log(`Produit: ${item.product_name}, Price: ${price}, Quantity: ${quantity}`);

        return {
          ...item,
          price,
          quantity
        };
      });

      console.log('Panier chargé:', this.cartItems);

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
    const index = this.cartItems.findIndex(i => i.product_id === item.product_id);
    if (index !== -1) {
      this.cartItems[index].quantity = quantity;
      this.updateFilteredItems();
    }

    this.panierService.updateQuantity(item.product_id, quantity).subscribe({
      next: (res: ResponseType<any>) => {
        if (res.code !== 200) this.loadCart();
      },
      error: () => this.loadCart()
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
    this.cartItems = this.cartItems.filter(i => i.product_id !== item.product_id);
    this.updateFilteredItems();

    this.panierService.removeFromCart(item.product_id).subscribe({
      next: (res: ResponseType<any>) => {
        if (res.code !== 200) this.loadCart();
      },
      error: () => this.loadCart()
    });
  }

  private updateFilteredItems() {
    this.filteredCartItems = this.searchTerm
      ? this.cartItems.filter(item => (item.product_name?.toLowerCase() || '').includes(this.searchTerm))
      : [...this.cartItems];
  }

  // Propriété calculée pour le total
getTotalPrice(): number {
  return this.cartItems.reduce((total, it) => {
    return total + (Number(it.prix) || 0) * (Number(it.quantity) || 0);
  }, 0);
}




async proceedToPayment() {
  if (this.cartItems.length === 0) return;

  const totalFormatted = this.getTotalPrice().toLocaleString('fr-FR');
  const alert = await this.alertController.create({
    header: 'Procéder au paiement',
    message: `Total : ${totalFormatted} FCFA`,
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
