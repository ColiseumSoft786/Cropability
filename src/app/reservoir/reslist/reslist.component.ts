import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {AppService} from '../../app.service';
import {AuthService} from '../../_services/auth.service';
import {ReservoirService} from '../../_services/reservoir.service';

@Component({
  selector: 'app-reslist',
  templateUrl: './reslist.component.html',
  styleUrls: ['./reslist.component.scss']
})
export class ReslistComponent implements OnInit {
    public res = [];
    public form = {
        name: '',
        capacity: '',
        unit: '',
        id: ''
    };
    formtype = 'create';
    constructor(public appSrv: AppService, private resSrv: ReservoirService) {
        this.appSrv.pageTitle = 'Reservoirs';
    }
  ngOnInit() {
      this.resSrv.getAll().subscribe((data: any) => {
        this.res = data;
      });
  }
  addResveroir() {
      if (this.formtype === 'create') {
          this.resSrv.create(this.form).subscribe((data: any) => {
              this.res = data;
              this.formtype = 'create';
              this.reset();
          });
      }
      if (this.formtype === 'update') {
          this.resSrv.update(this.form).subscribe((data: any) => {
              this.res = data;
              this.formtype = 'create';
              this.reset();
          });
      }
  }
  updatePrepare(res) {
      this.form.name = res.name;
      this.form.capacity = res.capacity;
      this.form.unit = res.unit;
      this.form.id = res.id;
      this.formtype = 'update';
  }
  reset() {
      // this.form.name = '';
      // this.form.capacity = '';
      // this.form.unit = '';
  }

}
