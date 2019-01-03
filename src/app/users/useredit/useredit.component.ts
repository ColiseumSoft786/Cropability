import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {UserService} from '../../Services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
const now = new Date();

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.scss',
      '../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
  ]
})
export class UsereditComponent implements OnInit {

    public form = {
        id: '',
        username: '',
        email: '',
        fullname: '',
        phone: '',
        joining: '',
        position: '',
        salary: '',
        role: '',
        cnic: '',
        enabled: false
    };
    public date = '';
    public olddate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    public roles = [];

    displayMonths = 1;
    disabled = false;
    constructor(
        private auth: AuthService,
        private userSrv: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.userSrv.getUserById(id).subscribe((data: any) => {
            const joining = new Date(data.joining_date);
            this.olddate.day = joining.getUTCDate();
            this.olddate.month = joining.getUTCMonth() + 1;
            this.olddate.year = joining.getUTCFullYear();
            this.form.id = data.id;
            this.form.username = data.username;
            this.form.cnic = data.cnic;
            this.form.email = data.email;
            this.form.fullname = data.fullname;
            this.form.role = data.roleId;
            this.form.salary = data.salary;
            this.form.position = data.position;
            this.form.phone = data.phone;
            this.form.enabled = data.enabled;
            console.log(this.form);
        });
        this.userSrv.getAllRoles().subscribe((data: any) => {
            this.roles = data;
        });

    }
    updateUser() {
        this.form.joining = this.olddate['year'] + '-' + this.olddate['month'] + '-' + this.olddate['day'];
        this.userSrv.updateUser(this.form).subscribe((data: any) => {
            console.log(data);
            this.router.navigate(['/users']);
        });
    }

}
