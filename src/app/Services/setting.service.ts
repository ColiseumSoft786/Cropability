import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
    private url = 'http://46.101.57.72:3000';
    private options;
    constructor(private http: HttpClient) {
        this.options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'access-token': localStorage.getItem('token')
            })
        };
    }

  canRegister() {
      return this.http.get(this.url + '/settings/register/check', this.options);
  }
}
