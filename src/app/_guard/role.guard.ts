import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {AppService} from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor (private app: AppService, private router: Router) {}
    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const role = next.data['role'];
      const perm = next.data['perm'];
      if (!this.app.isRole(role, perm)) {
        this.router.navigate(['']);
      } else {
        return true;
      }
  }
}
