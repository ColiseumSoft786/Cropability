import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
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
  getAll() {
      const f = JSON.parse(localStorage.getItem('sf'));
      return this.http.get(this.url + '/area/' + f, this.options);
  }
    createArea(form) {
        const f = JSON.parse(localStorage.getItem('sf'));
        const uid = JSON.parse(localStorage.getItem('user')).id;
        return this.http.post(this.url + '/area/' + f + '/create/' + uid, form, this.options);
    }
    public uploadImage(file) {
        const fd = new FormData();
        fd.append('file', file);
        return this.http.post(this.url + '/area/create/image', fd, this.options);
    }
    updateArea(form) {
        return this.http.post(this.url + '/area/update/' + form.id, form, this.options);
    }
    getById(id) {
        return this.http.get(this.url + '/area/byid/' + id, this.options);
    }
    getZones(aid) {
        return this.http.get(this.url + '/area/zone/' + aid, this.options);
    }
}
