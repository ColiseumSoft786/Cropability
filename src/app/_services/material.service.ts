import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
    private url = environment.baseUrl;
    private options;
    constructor(private http: HttpClient) {
        this.options = {
            headers: new HttpHeaders({
                'access-token': localStorage.getItem('token'),
            })
        };
    }
  public getAll() {
      return this.http.get(this.url + '/material/', this.options);
  }
  public addMaterial(data) {
      return this.http.post(this.url + '/material/create', data, this.options);
  }
  public editMaterial(data) {
      return this.http.post(this.url + '/material/edit/' + data.id, data, this.options);
  }

  public uploadImage(file) {
      const fd = new FormData();
      fd.append('file', file);
      return this.http.post(this.url + '/material/create/image', fd, this.options);
  }
  public getById(id) {
      return this.http.get(this.url + '/material/getbyid/' + id, this.options);
  }
}
