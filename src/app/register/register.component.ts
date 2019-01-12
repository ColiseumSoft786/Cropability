import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {SettingService} from '../_services/setting.service';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
        '../../vendor/styles/pages/authentication.scss'
    ]
})
export class RegisterComponent implements OnInit {
    credentials = {
        name: '',
        email: '',
        password: ''
    };
  constructor(private appService: AppService, private settingsServ: SettingService, private router: Router) {
      this.appService.pageTitle = 'Register';
      this.canRegister();
  }
    canRegister() {
        this.settingsServ.canRegister().subscribe(
            (data: any) => {
                if (data === false) {
                   this.router.navigate(['login']);
                }
            },
            error => {
                console.log(`Error`, error);
            }
        );
    }

  ngOnInit() {
  }

}
