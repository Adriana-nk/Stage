import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CartItem {
  product_id: number;
  product_name: string;
  quantity: number;
  prix: number;
  unit?: string;
  image?: string;
  product?: { price: number }; // ajout du product pour récupérer le prix
}


export interface ResponseType<T = any> {
  code: number;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'http://127.0.0.1:8000/api/customer';
  private panierSubject = new BehaviorSubject<CartItem[]>([]);
  panier$ = this.panierSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshCart();
  }

  refreshCart() {
    this.getCart().subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.panierSubject.next(res.data);
        }
      },
      error: () => {
        this.panierSubject.next([]);
      }
    });
  }

  getCart(): Observable<ResponseType<CartItem[]>> {
    return this.http.get<ResponseType<CartItem[]>>(`${this.apiUrl}/cart`);
  }

  addToCart(product_id: number, quantity: number = 1): Observable<ResponseType<CartItem[]>> {
    return this.http.post<ResponseType<CartItem[]>>(`${this.apiUrl}/add-to-cart`, { product_id, quantity });
  }

  updateQuantity(product_id: number, quantity: number): Observable<ResponseType<CartItem[]>> {
    return this.http.post<ResponseType<CartItem[]>>(`${this.apiUrl}/update-quantity`, { product_id, quantity });
  }

  removeFromCart(product_id: number): Observable<ResponseType<CartItem[]>> {
    return this.http.post<ResponseType<CartItem[]>>(`${this.apiUrl}/remove-from-cart`, { product_id });
  }

  // Méthodes pour synchroniser le panier après chaque opération
  addAndSync(product_id: number, quantity: number = 1) {
    this.addToCart(product_id, quantity).subscribe(() => this.refreshCart());
  }

  updateAndSync(product_id: number, quantity: number) {
    this.updateQuantity(product_id, quantity).subscribe(() => this.refreshCart());
  }

  removeAndSync(product_id: number) {
    this.removeFromCart(product_id).subscribe(() => this.refreshCart());
  }
}
