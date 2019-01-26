import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
    private loggedInStatus = false;
    private token = '';
    private url = environment.baseUrl;
    private options;
    constructor(private http: HttpClient) {
        this.options = {
            headers: new HttpHeaders({
                'access-token': localStorage.getItem('token'),
            })
        };
    }
    create(zone) {
        const f = JSON.parse(localStorage.getItem('sf'));
        const uid = JSON.parse(localStorage.getItem('user')).id;
        return this.http.post(this.url + '/zone/' + f + '/create/' + uid, zone, this.options);
    }
    public uploadImage(file) {
        const fd = new FormData();
        fd.append('file', file);
        return this.http.post(this.url + '/zone/create/image', fd, this.options);
    }
}
