import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  id?: number;
  nom: string;
  description?: string;
  image_url?: string;
  prix: number;
  stock?: number;
  categorie?: string;
  favori?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Récupérer un produit par ID
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Créer un produit
  createProduct(produit: Produit): Observable<any> {
    return this.http.post<any>(this.baseUrl, produit);
  }

  // Mettre à jour un produit
  updateProduct(id: number, produit: Produit): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, produit);
  }

  // Supprimer un produit
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
