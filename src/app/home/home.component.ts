import { Component } from '@angular/core';
import { AppService } from '../app.service';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private appService: AppService, private auth: AuthService, private router: Router) {
    this.appService.pageTitle = 'Home';
  }

}
