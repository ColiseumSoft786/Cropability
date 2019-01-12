import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
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
        return this.http.get(this.url + '/fields/', this.options);
    }
}
