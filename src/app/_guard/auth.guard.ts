import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {AppService} from '../app.service';
import {UserService} from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private auth: AuthService, private user: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.user.updatePerms();
      return this.auth.isLoggedIn;
  }
  canActivateChild() {
      this.user.updatePerms();
      return this.auth.isLoggedIn;
  }
}
