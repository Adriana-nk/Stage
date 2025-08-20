import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Inscription3FormService {

  private apiUrl = 'http://127.0.0.1:8000/api/auth/register'; // URL de ton endpoint

  constructor(private http: HttpClient) {}

  register(data: { password: string, [key: string]: any }): Observable<any> {
    // Ici, tu peux ajouter d'autres champs si nécessaire
    return this.http.post(this.apiUrl, data);
  }
}
