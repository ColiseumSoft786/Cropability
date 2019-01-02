import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../Services/auth.service';
import {UserService} from '../../../Services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rolecreate',
  templateUrl: './rolecreate.component.html', styleUrls: ['../../../../vendor/libs/ngx-toastr/ngx-toastr.scss'],
})
export class RolecreateComponent implements OnInit {
  public record: any;
  public role = {name: '', description: ''};
  public error = '';
  constructor(private auth: AuthService,
              private userSrv: UserService,
              private toast: ToastrService,
              private router: Router
  ) { }

  ngOnInit() {
    this.userSrv.getAllFeatures().subscribe((data: any) => {
      this.auth.checkResponse(data);
      const record = [];
      data.forEach(function (item) {
          const row = {
              feature: item,
              fullperm: false,
              read: false,
              create: false,
              update: false,
              delete: false
          };
          record.push(row);
      });
      this.record = record;
    });
  }
  confirm() {
    if (this.role.name !== '') {
        this.userSrv.createRole(this.record, this.role).subscribe((data: any) => {
          this.auth.checkResponse(data);
            this.toast.success('Role is created with some permissions', 'Role Created');
            this.router.navigate(['roles']);
        });
    } else {
      this.error = 'Enter role name';
    }
  }
}
