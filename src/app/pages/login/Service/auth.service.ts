import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserHelper } from 'src/app/shared/helpers/user';
import { LocalStorage } from 'src/app/shared/helpers/localStorage';

export interface AuthResponse {
  message: string;
  access_token?: string;
  token_type?: string;
  user?: any;
  errors?: { [key: string]: string[] };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly URL = '/auth';

  // Observable pour suivre l'état de l'utilisateur connecté
  public currentUser$ = new BehaviorSubject<any>(UserHelper.getUser());

  constructor() {}
login(email: string, password: string): Observable<AuthResponse> {
  console.log('Tentative de login avec:', { email, password });

  return this.http.post<AuthResponse>(`${environment.apiUrl}${this.URL}/login`, { email, password }).pipe(
    tap((res: any) => {
      console.log('Réponse serveur login:', res);

      if (res.data?.access_token && res.data?.user) {
        // Sauvegarder dans LocalStorage via UserHelper
        UserHelper.saveUser(res.data.user, res.data.access_token);
        console.log('Utilisateur sauvegardé dans LocalStorage:', res.data.user);
        this.currentUser$.next(res.data.user);
      }
    }),
    catchError((err) => {
      console.error('Erreur login:', err);
      return of({ message: err.error?.message || 'Erreur login' });
    })
  );
}



  register(data: {
    nom: string;
    prenom: string;
    telephone?: string;
    genre?: string;
    region?: string;
    ville?: string;
    profil?: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${this.URL}/register`, data).pipe(
      tap((res) => {
        if (res.access_token && res.user) {
          UserHelper.saveUser(res.user, res.access_token);
          this.currentUser$.next(res.user);
        }
      }),
      catchError((err) => {
        console.error('Erreur inscription:', err);
        return of({ message: err.error?.message || 'Erreur inscription' });
      })
    );
  }

  logout(): void {
    UserHelper.logoutUser();
    this.currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return LocalStorage.getItem('patnuc_space_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): any | null {
    return UserHelper.getUser();
  }
}
