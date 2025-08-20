import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: any;
  errors?: { [key: string]: string[] };
}



@Injectable({
  providedIn: 'root'
})
export class Inscription1FormService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth/register';

  constructor(private http: HttpClient) { }

  register(data: {
    nom: string;
    prenom: string;
    telephone: string;
    genre: string;
    region?: string;
    ville?: string;
    profil?: string;
    email?: string;
    password?: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl, data);
  }
}
