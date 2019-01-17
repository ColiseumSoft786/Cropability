import {Component, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from '../../_services/material.service';
import {environment} from '../../../environments/environment';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF} from 'ngx-image-gallery';
import 'hammerjs';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-mat-list',
  templateUrl: './mat-list.component.html',
  styleUrls: [
      '../../../vendor/libs/ngx-image-gallery/ngx-image-gallery.scss','./mat-list.component.scss']
})
export class MatListComponent implements OnInit {
    @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

    conf: GALLERY_CONF = {
        imageOffset: '0px',
        imageBorderRadius: '0',
        showDeleteControl: false,
        showImageTitle: false,
        backdropColor: 'rgba(255, 255, 255, 0.42)'
    };
  public mats = [];
  images = [{
      url: '',
      title: '',
      altText: '',
      thumbnailUrl: ''
  }];
    public url = environment.baseUrl;
    constructor(
      private matSrv: MaterialService,
      private appSrv: AppService
  ) {
        this.appSrv.pageTitle = 'Materials';
    }

  ngOnInit() {
    this.matSrv.getAll().subscribe((data: any) => {
      console.log(data);
      this.mats = data;
    });
  }
  showImage (id, title) {
      const someimage = document.getElementById(id);
      const myimg = someimage.getElementsByTagName('img')[0];
      const mysrc = myimg.src;
      this.images[0].url = mysrc;
      this.images[0].thumbnailUrl = mysrc;
      this.images[0].title = title;
      console.log(this.images);
      this.ngxImageGallery.open(0);
      console.log(mysrc);
  }
}
