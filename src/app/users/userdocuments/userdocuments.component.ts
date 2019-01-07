import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../../app.service';
import {UserService} from '../../Services/user.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-userdocuments',
  templateUrl: './userdocuments.component.html',
  styleUrls: ['./userdocuments.component.scss',
      '../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
  ]
})
export class UserdocumentsComponent implements OnInit {
    @ViewChild('docForm') formValues;
  public user = {};
    displayMonths = 1;
    navigation = 'select';
    disabled = false;
    document = {
        name: '',
        expiry: ''
    };
    url = environment.baseUrl;
    documents = [];
    file: any;
    fileerror = '';
  constructor(
            public appSrv: AppService,
            public userSrv: UserService,
            public route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.appSrv.pageTitle = 'Documents';
    const id = this.route.snapshot.paramMap.get('id');
    this.userSrv.getUserById(id).subscribe((data: any) => {
          this.user = data;
          console.log(data);
      });
    this.userSrv.getDocumentsByUser(id).subscribe((data: any) => {
      console.log(data);
      this.documents = data;
    });
  }
  uploadDocument() {
    console.log(this.file);
    if (this.file !== undefined) {
        const expiry = this.document.expiry['year'] + '-' + this.document.expiry['month'] + '-' + this.document.expiry['day'];
        this.document.expiry = expiry;
        this.fileerror = '';
        const id = this.route.snapshot.paramMap.get('id');
        this.userSrv.setDocumentImage(this.file).subscribe((filename: any) => {
          this.userSrv.setDocument(this.document, filename, id).subscribe((docs: any) => {
            this.documents = docs;
            this.document.name = '';
            this.document.expiry = '';
            this.formValues.reset();
          });
        });
    } else {
      this.fileerror = 'Please select the file';
    }
    console.log(this.document);
  }
  selectFile(event) {
      const file = <File>event.target.files[0];
      this.file = file;
      console.log(this.file);
  }
  deleteDoc(id) {
      const userid = this.route.snapshot.paramMap.get('id');
      this.userSrv.deleteDocument(id, userid).subscribe((docs: any) => {
        this.documents = docs;
    });
  }

}
