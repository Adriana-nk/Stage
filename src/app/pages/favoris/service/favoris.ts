import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produit } from 'src/app/services/product.service';
import ResponseType from 'src/app/core/models/api.resp.model';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Ajouter ou retirer un produit des favoris
  toggleFavorite(productId: number): Observable<ResponseType<null>> {
    return this.http.post<ResponseType<null>>(`${this.apiUrl}/favorites/toggle`, { product_id: productId });
  }

  // Récupérer tous les favoris
  getFavorites(): Observable<Produit[]> {
    return this.http.get<ResponseType<Produit[]>>(`${this.apiUrl}/favorites`)
      .pipe(
        map(res => res.data || []) // On renvoie toujours un tableau de Produit
      );
  }
}
