import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserHelper } from '../helpers/user';

@Injectable({
  providedIn: 'root',
})
export class IsGuestGuard implements CanActivate {
  private readonly router = inject(Router);

 public canActivate(): boolean {
    if (UserHelper.isConnect()) {
      
      this.router.navigate(['/acheteur']);
      return false;
    }
    return true;
  }
}
