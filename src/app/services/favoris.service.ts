import { Injectable } from '@angular/core';

export interface Produit {
  id: number;
  nom: string;
  image: string;
  prix: number;
  stock?: number;
  categorie: string;
  favori?: boolean; // facultatif ici, utile côté UI
}

@Injectable({
  providedIn: 'root',
})
export class FavorisService {
  private favoris: Produit[] = [];

  getFavoris(): Produit[] {
    return this.favoris;
  }

  estFavori(produit: Produit): boolean {
    return this.favoris.some(p => p.id === produit.id);
  }

  ajouterFavori(produit: Produit) {
    if (!this.estFavori(produit)) {
      this.favoris.push(produit);
    }
  }

  retirerFavori(produit: Produit) {
    this.favoris = this.favoris.filter(p => p.id !== produit.id);
  }

  toggleFavori(produit: Produit) {
    if (this.estFavori(produit)) {
      this.retirerFavori(produit);
    } else {
      this.ajouterFavori(produit);
    }
  }
}
