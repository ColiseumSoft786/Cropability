import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../Services/auth.service';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';

const now = new Date();

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;



@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: [
      './usercreate.component.scss',
      '../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
  ]
})
export class UsercreateComponent implements OnInit {
  public form = {
      username: '',
      email: '',
      password: '',
      fullname: '',
      phone: '',
      joining: '',
      position: '',
      salary: '',
      role: '',
      cnic: '',
      enabled: false
  };
  public roles = [];

    displayMonths = 1;
    navigation = 'select';
    disabled = false;
  constructor(
      private auth: AuthService,
      private userSrv: UserService,
      private router: Router
  ) { }

  ngOnInit() {
      this.userSrv.getAllRoles().subscribe((data: any) => {
         this.roles = data;
      });
  }
  createUser() {
      const joining = this.form.joining['year'] + '-' + this.form.joining['month'] + '-' + this.form.joining['day'];
      this.form.joining = joining;
      console.log(this.form);
      this.userSrv.createUser(this.form).subscribe((data: any) => {
            console.log(data);
            this.router.navigate(['/users']);
      });
  }

}
