import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {AppService} from '../../app.service';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public users: any;

    // Filters

    filterVerified = 'Any';
    filterRole = 'Any';
    filterStatus = 'Any';
    filterLatestActivity = [null, null];
    // Options
    dataUrl = 'assets/json/pages_users_list.json';
    searchKeys = ['id', 'account', 'email', 'name'];
    sortBy = 'id';
    sortDesc = true;
    perPage = 10;

    filterVal = '';
    currentPage = 1;
    totalItems = 0;

    usersData: Object[] = [];
    originalUsersData: Object[] = [];
  constructor(private userSrv: UserService, private appService: AppService, private auth: AuthService) {
      this.appService.pageTitle = 'Users';
      this.loadData();
  }

  ngOnInit() {
  }
    loadData() {
        this.userSrv.getAllUsers()
            .subscribe((data: any) => {
                this.auth.checkResponse(data);
                this.originalUsersData = data;
                this.update();
                console.log('hey');
            });
    }
    changeStatus(status, id) {
      this.userSrv.changeUserStatus(status, id).subscribe((data: any) => {
          this.auth.checkResponse(data);

          this.loadData();

          // this.update();
      });
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.perPage);
    }
    update() {
        const data = this.filter(this.originalUsersData);
        this.totalItems = data.length;

        this.sort(data);
        this.usersData = this.paginate(data);
    }

    filter(data) {
        const filter = this.filterVal.toLowerCase();
        return !filter ?
            data.slice(0) :
            data.filter(d => {
                return Object.keys(d)
                    .filter(k => this.searchKeys.includes(k))
                    .map(k => String(d[k]))
                    .join('|')
                    .toLowerCase()
                    .indexOf(filter) !== -1 || !filter;
            });
    }

    sort(data) {
        data.sort((a: any, b: any) => {
            a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
            b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

            if (a < b) { return this.sortDesc ? 1 : -1; }
            if (a > b) { return this.sortDesc ? -1 : 1; }
            return 0;
        });
    }

    paginate(data) {
        const perPage = parseInt(String(this.perPage), 10);
        const offset = (this.currentPage - 1) * perPage;

        return data.slice(offset, offset + perPage);
    }

    setSort(key) {
        if (this.sortBy !== key) {
            this.sortBy = key;
            this.sortDesc = false;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        this.currentPage = 1;
        this.update();
    }


}
