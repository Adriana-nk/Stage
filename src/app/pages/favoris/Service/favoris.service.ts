import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  id: number;
  name: string;       // utilisé dans le HTML et TS
  price: number;      // utilisé dans le HTML et TS
  image?: string;
  stock?: number;     // optionnel pour éviter les erreurs
}

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  private baseUrl = 'http://127.0.0.1:8000/api/customer'; // URL de ton API backend Laravel

  constructor(private http: HttpClient) {}

  getFavoris(userId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl}/favorites/${userId}`);
  }

  addToFavoris(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/addToFavorites`, {
      user_id: userId,
      product_id: productId
    });
  }

  removeFromFavoris(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeFromFavorites`, {
      user_id: userId,
      product_id: productId
    });
  }
}
