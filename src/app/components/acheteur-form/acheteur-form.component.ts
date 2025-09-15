import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService, Produit } from '../../services/product.service';
import { PanierService } from '../../pages/panier/service/panier';

@Component({
  selector: 'app-acheteur-form',
  templateUrl: './acheteur-form.component.html',
  styleUrls: ['./acheteur-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class AcheteurFormComponent implements OnInit {
  searchQuery = '';
  categories: string[] = [];
  selectedCategory: string | null = null;
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  favorites: number[] = [];

  constructor(
    private productService: ProductService,
    private panierService: PanierService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadFavorites();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.produits = res.data;
          this.applyFilters();
          this.categories = [
            'Tout',
            ...Array.from(new Set(this.produits.map((p) => p.categorie ?? 'Autre'))),
          ];
        } else console.error(res.message);
      },
      error: (err) => console.error('Erreur récupération produits:', err),
    });
  }

  loadFavorites(): void {
    this.productService.getFavorites().subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.favorites = res.data.map((p: Produit) => p.id);
        }
      },
      error: (err) => console.error('Erreur récupération favoris:', err),
    });
  }

  isFavorite(productId: number): boolean {
    return this.favorites.includes(productId);
  }

  toggleFavorite(productId: number) {
    this.productService.toggleFavorite(productId).subscribe({
      next: async (res) => {
        if (res.code === 200) {
          if (this.isFavorite(productId)) {
            this.favorites = this.favorites.filter((id) => id !== productId);
          } else this.favorites.push(productId);

          const toast = await this.toastCtrl.create({
            message: res.message,
            duration: 2000,
            color: 'success',
          });
          await toast.present();
        }
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Erreur lors de la mise à jour des favoris',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }

  addToCart(produit: Produit) {
    this.panierService.addToCart(produit.id, 1).subscribe({
      next: async (res) => {
        if (res.code === 200) {
          const toast = await this.toastCtrl.create({
            message: `${produit.nom} ajouté au panier`,
            duration: 2000,
            color: 'success',
          });
          await toast.present();
        }
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Impossible d\'ajouter le produit au panier',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }

  applyFilters() {
    this.filteredProduits = this.produits.filter((p) => {
      const matchCategory =
        !this.selectedCategory ||
        this.selectedCategory === 'Tout' ||
        p.categorie === this.selectedCategory;
      const matchSearch =
        !this.searchQuery ||
        p.nom.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  onSeeAll() {
    this.selectedCategory = 'Tout';
    this.searchQuery = '';
    this.applyFilters();
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToCart() {
    this.router.navigate(['/panier']);
  }
}
