import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {  // 🔹 Assure-toi que c'est exporté
  id: number;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  favori?: boolean;
  categorie: string;
  image_url: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {  // 🔹 Assure-toi que c'est exporté
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponse<Produit[]>> {
    return this.http.get<ApiResponse<Produit[]>>(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<ApiResponse<Produit>> {
    return this.http.get<ApiResponse<Produit>>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: Produit): Observable<ApiResponse<Produit>> {
    return this.http.post<ApiResponse<Produit>>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: Partial<Produit>): Observable<ApiResponse<Produit>> {
    return this.http.put<ApiResponse<Produit>>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/products/${id}`);
  }

  toggleFavorite(productId: number): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/favorites/toggle`, { product_id: productId });
  }

  getFavorites(): Observable<ApiResponse<Produit[]>> {
    return this.http.get<ApiResponse<Produit[]>>(`${this.apiUrl}/favorites`);
  }
}
