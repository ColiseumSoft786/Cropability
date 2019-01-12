import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../_services/user.service';
import {AppService} from '../../../app.service';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-roleslist',
  templateUrl: './roleslist.component.html',
  styleUrls: ['./roleslist.component.scss']
})
export class RoleslistComponent implements OnInit {
  public roles: any;
  constructor(public userSrv: UserService, public appSrv: AppService, private auth: AuthService) {
    this.appSrv.pageTitle = 'Roles';
  }
  ngOnInit() {
    this.userSrv.getAllRoles().subscribe((data: any) => {
        this.auth.checkResponse(data);
        this.roles = data;
    });
  }
  delete(id) {

  }
}
