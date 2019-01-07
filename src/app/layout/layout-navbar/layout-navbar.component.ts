import { Component, Input, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;
  user: any;
  url = environment.baseUrl;
  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') private hostClassMain = true;

  constructor(private router: Router, private auth: AuthService, private appService: AppService, private layoutService: LayoutService) {
    this.isRTL = appService.isRTL;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }
    logout() {
        this.auth.setLoggedIn(false, '');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}
