import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservoirService {
    private url = environment.baseUrl;
    private options;
    constructor(private http: HttpClient) {
        this.options = {
            headers: new HttpHeaders({
                'access-token': localStorage.getItem('token'),
            })
        };
    }
    getAll() {
        const sf = JSON.parse(localStorage.getItem('sf'));
        return this.http.get(this.url + '/reservoir/' + sf, this.options);
    }
    create(data) {
        const sf = JSON.parse(localStorage.getItem('sf'));
        return this.http.post(this.url + '/reservoir/create/' + sf, data, this.options);
    }
    update(data) {
        const sf = JSON.parse(localStorage.getItem('sf'));
        return this.http.post(this.url + '/reservoir/update/' + sf, data, this.options);
    }
}
