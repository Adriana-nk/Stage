import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PanierItem {
  product_id: number;
  quantity: number;
  product_name?: string;
  price?: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseUrl = 'http://127.0.0.1:8000/api/customer';

  constructor(private http: HttpClient) { }

  // Ajouter au panier
  addToCart(userId: number, productId: number, quantity: number = 1): Observable<any> {
    const body = { user_id: userId, product_id: productId, quantity };
    return this.http.post(`${this.baseUrl}/add-to-cart`, body);
  }

  // Supprimer du panier
  removeFromCart(userId: number, productId: number): Observable<any> {
    const body = { user_id: userId, product_id: productId };
    return this.http.post(`${this.baseUrl}/remove-from-cart`, body);
  }

  // Mettre à jour la quantité
  updateQuantity(userId: number, productId: number, quantity: number): Observable<any> {
    const body = { user_id: userId, product_id: productId, quantity };
    return this.http.post(`${this.baseUrl}/update-cart-quantity`, body);
  }

  // Récupérer le panier complet
  getCart(userId: number): Observable<PanierItem[]> {
    return this.http.get<PanierItem[]>(`${this.baseUrl}/cart?user_id=${userId}`);
  }
}
