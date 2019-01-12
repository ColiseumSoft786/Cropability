import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {SettingService} from '../_services/setting.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
        '../../vendor/styles/pages/authentication.scss',
        './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {
  public form = {
        username: '',
        password: '',
        rememberMe: false
    };
  public error = '';
  public canRegisterValue = true;
  constructor(private appService: AppService, private auth: AuthService, private router: Router, private settingsServ: SettingService) {
      if (localStorage.getItem('loggedIn') === 'true') {
          this.router.navigate(['']);
      }
      this.appService.pageTitle = 'Login';
      this.canRegister();
  }
  tryLogin() {
      this.auth.login(this.form.username, this.form.password).subscribe(
          (data: any) => {
              if (!data) {
                  this.error = 'Invalid Credentials';
              } else {
                  this.error = '';
                  localStorage.setItem('user', JSON.stringify(data.user));
                  localStorage.setItem('perm', JSON.stringify(data.perm));
                  localStorage.setItem('forms', JSON.stringify(data.field));
                  localStorage.setItem('sf', JSON.stringify(data.field[0].id));
                  this.auth.setLoggedIn(true, data.token);
                  this.router.navigate(['']);
              }
          },
          error => {
              console.log(`Error`, error);
          }
      );
  }
  canRegister() {
    this.settingsServ.canRegister().subscribe(
        (data: any) => {
            this.canRegisterValue = data;
            console.log(this.canRegisterValue);
        },
        error => {
            console.log(`Error`, error);
        }
    );
  }
  ngOnInit() {
  }

}
