import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductService, Produit } from '../../services/product.service';

@Component({
  selector: 'app-acheteur-form',
  templateUrl: './acheteur-form.component.html',
  styleUrls: ['./acheteur-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, DecimalPipe],
})
export class AcheteurFormComponent implements OnInit {
  searchQuery: string = '';
  categories: string[] = [];
  selectedCategory: string | null = null;
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        // Adapter la réponse à notre interface Produit
        this.produits = data.data.map((p: any) => ({
          id: p.id,
          nom: p.nom,
          description: p.description,
          prix: p.prix,
          stock: p.stock,
          categorie: p.categorie,
          favori: p.favori,
          image_url: p.image,
        }));

        this.filteredProduits = [...this.produits];

        // Extraire toutes les catégories uniques
        this.categories = ['Tout', ...Array.from(new Set(this.produits.map(p => p.categorie ?? 'Autre')))];
      },
      error: (err) => {
        console.error('Erreur récupération produits:', err);
      },
    });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    if (cat === 'Tout') {
      this.filteredProduits = [...this.produits];
    } else {
      this.filteredProduits = this.produits.filter(p => p.categorie === cat);
    }
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProduits = this.produits.filter(p => p.nom.toLowerCase().includes(query));
  }

  onSeeAll() {
    this.filteredProduits = [...this.produits];
    this.selectedCategory = null;
  }

  toggleFavori(produit: Produit) {
    produit.favori = !produit.favori;
    // Optionnel : envoyer l'update au backend si nécessaire
  }

  ajouterAuPanier(produit: Produit) {
    console.log('Produit ajouté au panier :', produit);
    // Ici tu peux implémenter la logique du panier
  }

  goToNotifications() {
    console.log('Aller aux notifications');
  }

  goToCart() {
    console.log('Aller au panier');
  }
}
