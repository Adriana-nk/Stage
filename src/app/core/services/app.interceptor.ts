import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';
import { LocalStorage } from '../../shared/helpers/localStorage';
import { UserHelper } from '../../shared/helpers/user';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'danger';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor {

  private excludeUrls = ['/auth/login', '/auth/register'];

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = LocalStorage.getItem('PATNUC_space_token');

    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    let loader: HTMLIonLoadingElement | null = null;
    let unauthorized = false;

    // ⚡ Créer le loader et attendre qu'il soit affiché
    const loaderObs = from(
      this.loadingCtrl.create({ message: 'Chargement...', spinner: 'crescent', translucent: true })
        .then(l => { loader = l; return loader.present(); })
    );

    return loaderObs.pipe(
      switchMap(() => next.handle(authReq)),
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('[HTTP Response]', event);
          if (!this.isExcludedUrl(authReq.url)) {
            this.showToast('success', 'Opération réussie');
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          unauthorized = true;
        }
        return this.handleHttpError(error);
      }),
      finalize(() => {
        // ⚡ S'assurer que le loader est bien dismiss
        if (loader) {
          loader.dismiss().catch(() => console.warn('Loader déjà fermé'));
        }

        // Logout si non-exclu et non-autorisé
        if (unauthorized && !this.isExcludedUrl(authReq.url)) {
          console.warn('[HTTP] Unauthorized - Logging out user');
          UserHelper.logoutUser();
          setTimeout(() => location.reload(), 200);
        }
      })
    );
  }

  private isExcludedUrl(url: string): boolean {
    return this.excludeUrls.some(u => url.includes(u));
  }

  private showToast(type: ToastType, message: string, duration = 3000) {
    this.toastCtrl.create({ 
      message, 
      color: type === 'success' ? 'success' : type === 'danger' ? 'danger' : 'dark', 
      duration, 
      position: 'top' 
    }).then(toast => toast.present());
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    let type: ToastType = 'error';
    let message = 'Une erreur est survenue';
    let timeout = 5000;

    if (error.error instanceof ErrorEvent) {
      message = 'Erreur réseau - Vérifiez votre connexion';
      console.error('[HTTP Network Error]', error.error);
    } else {
      console.error('[HTTP Server Error]', error);
      switch (error.status) {
        case 0: message = 'Serveur injoignable'; break;
        case 401: message = 'Session expirée - Veuillez vous reconnecter'; break;
        case 403: message = 'Accès refusé'; break;
        case 404: type = 'info'; message = 'Ressource non trouvée'; break;
        case 500: type = 'danger'; message = 'Erreur interne du serveur'; break;
        default: message = error.error?.message || `Erreur serveur (${error.status})`;
      }
    }

    this.showToast(type, message, timeout);
    return throwError(() => error);
  }
}
