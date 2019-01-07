import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../Services/auth.service';
import {UserService} from '../../../Services/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {isInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {AppService} from '../../../app.service';

@Component({
  selector: 'app-roleedit',
  templateUrl: './roleedit.component.html',
  styleUrls: ['./roleedit.component.scss']
})
export class RoleeditComponent implements OnInit {

    public record: any;
    public role = {id: '', name: '', description: ''};
    public error = '';
    public id;
    constructor(private auth: AuthService,
                private userSrv: UserService,
                private toast: ToastrService,
                private router: Router,
                private route: ActivatedRoute,
                private appService: AppService

) {
        this.appService.pageTitle = 'Role Edit';
        this.id = this.route.snapshot.paramMap.get('id');

    }

    ngOnInit() {
        this.userSrv.getPerByRoleId(this.id).subscribe((data: any) => {
            this.auth.checkResponse(data);
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
            });
        });
    }
    confirm() {
        if (this.role.name !== '') {
            this.userSrv.updateRole(this.record, this.role).subscribe((data: any) => {
                this.auth.checkResponse(data);
                this.toast.success('', 'Role Edit Done');
                this.router.navigate(['roles']);
            });
        } else {
            this.error = 'Enter role name';
        }
    }
}
