import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = environment.baseUrl;
    private options;
    constructor(private http: HttpClient) {
        this.options = {
            headers: new HttpHeaders({
                'access-token': localStorage.getItem('token'),
            })
        };
    }
    getAllUsers() {
      const user = JSON.parse(localStorage.getItem('user'));
      return this.http.get(this.url + '/users/list/' + user.id, this.options);
    }
    getAllRoles() {
        return this.http.get(this.url + '/roles/list', this.options);
    }
    getAllFeatures() {
        return this.http.get(this.url + '/roles/features', this.options);
    }
    createRole(perm, role) {
        const body = {
            perm: perm,
            role: role
        };
        return this.http.post(this.url + '/roles/create', body, this.options);
    }
    createUser(user) {
        return this.http.post(this.url + '/users/create', user, this.options);
    }
    updateRole(perm, role) {
        const body = {
            perm: perm,
            role: role
        };
        return this.http.post(this.url + '/roles/edit/' + role.id, body, this.options);
    }
    updateUser(user) {
        return this.http.post(this.url + '/users/edit/' + user.id, user, this.options);
    }
    updateUserProfile(user) {
        return this.http.post(this.url + '/users/update/' + user.id, user, this.options);
    }

    changeUserStatus(status, id) {
        return this.http.get(this.url + '/users/status/' + status + '/' + id, this.options);
    }
    changePassword(pass, id) {
        return this.http.post(this.url + '/users/changepassword/' + id, {password: pass}, this.options);
    }
    getPerByRoleId(id) {
        return this.http.get(this.url + '/roles/get/' + id, this.options);
    }
    getUserById(id) {
        return this.http.get(this.url + '/account/user/' + id, this.options);
    }
    getDocumentsByUser(id) {
        return this.http.get(this.url + '/users/documents/' + id, this.options);
    }
    updateProfile(file, id) {
        const fd = new FormData();
        fd.append('file', file);
        return this.http.post(this.url + '/users/profile/' + id, fd, this.options);
    }
    setDocument(doc, filename, id) {
           const body = {
               name: doc.name,
               expiry: doc.expiry,
               photo: filename
           };
           return this.http.post(this.url + '/users/document/' + id, body, this.options);
    }
    setDocumentImage(file) {
        const fd = new FormData();
        fd.append('file', file);
        return this.http.post(this.url + '/users/document/set/image', fd, this.options);
    }
    deleteDocument(id, userid) {
        return this.http.get(this.url + '/users/document/delete/' + id + '/' + userid, this.options);
    }
    updatePerms() {
        if (localStorage.getItem('user') !== null) {
            const options = {
                headers: new HttpHeaders({
                    'access-token': localStorage.getItem('token'),
                })
            };
            const id = JSON.parse(localStorage.getItem('user'))['roleId'];
            this.http.get(this.url + '/account/getRoles/' + id, options).subscribe((perm: any) => {
                console.log(perm);
                localStorage.setItem('perm', JSON.stringify(perm));
            });
        }
    }
}
