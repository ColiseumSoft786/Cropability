import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  private token = '';
  private url = environment.baseUrl;

  private options;
  constructor(private http: HttpClient, private router: Router) {
      console.log(this.url);
        this.loggedInCheck();

      this.options = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
          })
        };
  }
  public loggedInCheck() {
      if (localStorage.getItem('loggedIn') === 'true') {
          this.token = localStorage.getItem('token');
          if (this.token !== '' && this.token !== null) {
              this.loggedInStatus = true;
          }
      } else {
          this.loggedInStatus = false;
      }
  }
  setLoggedIn(value, token) {
      this.token = token;
      this.loggedInStatus = true;
      localStorage.setItem('loggedIn', value);
      localStorage.setItem('token', token);
  }
  get isLoggedIn() {
      this.loggedInCheck();
      if (this.loggedInStatus !== true) {
          this.router.navigate(['login']);
      }
      this.verifyToken();
      return this.loggedInStatus;
  }
  verifyToken() {
      const data = {
          token: localStorage.getItem('token')
      };
      this.http.post(this.url + '/tokenverify', data, this.options).subscribe(
          (datas: any) => {
              console.log(datas);
              if (datas.message !== 'valid') {
                  localStorage.removeItem('loggedIn');
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  this.token = null;
                  this.loggedInStatus = false;
                this.router.navigate(['login']);
              }
          });
  }
  checkResponse(data) {
      // if (data.xyz === 'false') {
      //     localStorage.removeItem('loggedIn');
      //     localStorage.removeItem('user');
      //     localStorage.removeItem('token');
      //     this.token = null;
      //     this.loggedInStatus = false;
      //    this.router.navigate(['login']);
      // }
  }
    login(username: string, password: string) {
        const data = {
            username: username,
            password: password
        };
        return this.http.post(this.url + '/account/login', data, this.options);
    }
}
