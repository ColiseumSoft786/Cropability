import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {UserService} from '../../Services/user.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
      '../../../vendor/libs/ng-select/ng-select.scss',
      '../../../vendor/styles/pages/account.scss',
      './profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user = {} ;
    curTab = 'general';
    public url = environment.baseUrl;
  password = '';
  rpassword = '';
  error = '';
  disabled = true;
  role = {};
  record = [];
  constructor(private appSrv: AppService,
              private userSrv: UserService,
              private toast: ToastrService
  ) {
    this.appSrv.pageTitle = 'Profile';
  }
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.user = user;
    }
    console.log(this.user);

      this.userSrv.getPerByRoleId(this.user['roleId']).subscribe((data: any) => {
          console.log(data);
          this.role = data.role;
          const perm = data.perm;
          this.userSrv.getAllFeatures().subscribe((feat: any) => {
              const record = [];
              feat.forEach(function (item) {
                  const row = {
                      id: 0,
                      feature: item,
                      fullperm: false,
                      read: false,
                      create: false,
                      update: false,
                      delete: false
                  };
                  record.push(row);
              });
              record.forEach(function (item) {
                  perm.forEach(function (inner) {
                      if (item.feature.id === inner.feature.id) {
                          item.id = inner.id;
                          item.fullperm = inner.full;
                          item.read = inner.read;
                          item.create = inner.create;
                          item.update = inner.update;
                          item.delete = inner.delete;
                      }
                  });
              });
              this.record = record;
              console.log(record);
              console.log(this.role);
          });
      });
  }
  selectImageInput() {
      document.getElementById('profilechange').click();
  }
  changeImage(event) {
    console.log(event);
    const file = <File>event.target.files[0];
    console.log(file);
    this.userSrv.updateProfile(file, this.user['id']).subscribe((data: any) => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data));
        this.toast.success('', 'Your profile picture has been changed.');

    });
  }
  updateProfile() {
    this.userSrv.updateUserProfile(this.user).subscribe((data: any) => {
        this.user = data;
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.toast.success('', 'Your profile has been updated');

    });
  }
    checkpasseq() {
      if (this.password !== this.rpassword) {
        this.error = 'both passwords should be same';
        this.disabled = true;
      } else {
        this.error = '';
        this.disabled = false;
      }
    }
    changePassword() {
        this.userSrv.changePassword(this.password, this.user['id']).subscribe((data: any) => {
            this.user = data;
            console.log(data);
            this.password = '';
            this.rpassword = '';
            localStorage.setItem('user', JSON.stringify(data));
            this.toast.success('', 'Your password has been changed.');

        });
    }
}
