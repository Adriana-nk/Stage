import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

interface Produit {
  id: number;
  nom: string;
  image: string;
  prix: number;
  stock?: number;
  categorie: string;
  favori?: boolean;
}

@Component({
  selector: 'app-acheteur-form',
  standalone: true,
  templateUrl: './acheteur-form.component.html',
  styleUrls: ['./acheteur-form.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AcheteurFormComponent {   // ✅ Nom corrigé
  /** ==== Données ==== */
  searchQuery: string = '';
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];

  categories: string[] = ['Tout', 'Fruits', 'Légumes', 'Céréales', 'Racines', 'Légumineuses'];
  selectedCategory: string = 'Tout';

  panier: Produit[] = [];

  constructor() {
    // 🔹 Simule les produits depuis ton backend
    this.produits = [
      { id: 1, nom: 'Mais', image: 'assets/mais.png', prix: 500, stock: 12, categorie: 'Fruits' },
      { id: 2, nom: 'Patate Douce', image: 'assets/patate-douce.png', prix: 350, stock: 20, categorie: 'Légumes' },
      { id: 3, nom: 'Haricot-vert', image: 'assets/Haricot-vert.png', prix: 450, stock: 50, categorie: 'Céréales' },
      { id: 4, nom: 'Haricot-Rouge', image: 'assets/Haricot-rouge.png', prix: 200, stock: 15, categorie: 'Racines' },
      { id: 5, nom: 'Macabo', image: 'assets/macabo.png', prix: 700, stock: 10, categorie: 'Racines' },
      { id: 6, nom: 'Folong', image: 'assets/Folong.png', prix: 600, stock: 8, categorie: 'Légumes' },
    ];
    this.filteredProduits = [...this.produits];
  }

  /** ==== Gestion des catégories ==== */
  filterByCategory(categorie: string) {
    this.selectedCategory = categorie;
    this.applyFilters();
  }

  /** ==== Recherche ==== */
  onSearch() {
    this.applyFilters();
  }

  /** ==== Filtrage global ==== */
  private applyFilters() {
    this.filteredProduits = this.produits.filter(p => {
      const matchesCategory =
        this.selectedCategory === 'Tout' || p.categorie === this.selectedCategory;
      const matchesSearch = p.nom.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  /** ==== Gestion favoris ==== */
  toggleFavori(produit: Produit) {
    produit.favori = !produit.favori;
  }

  /** ==== Gestion panier ==== */
  ajouterAuPanier(produit: Produit) {
    this.panier.push(produit);
    console.log('Panier:', this.panier);
  }

  /** ==== Navigation fictive ==== */
  goToNotifications() {
    console.log('Naviguer vers Notifications');
  }

  goToCart() {
    console.log('Naviguer vers Panier');
  }

  /** ==== Tout voir ==== */
  onSeeAll() {
    this.selectedCategory = 'Tout';
    this.applyFilters();
  }
}
