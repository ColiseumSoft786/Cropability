import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AreaService} from '../../_services/area.service';
import {environment} from '../../../environments/environment';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
  @ViewChild('image') file: ElementRef;
  public areas = [];
    public url = environment.baseUrl;
    public form = {
        id: '',
        name: '',
        image: '',
        area: '',
        isGrowing: false,
        unit: ''
    };
    public formtype = 'Create';
    constructor(
      private areaSrv: AreaService,
      private router: Router,
      private appSrv: AppService
  ) { }

  ngOnInit() {
    this.areaSrv.getAll().subscribe((data: any) => {
      this.areas = data;
    });
  }
  addArea(form: NgForm) {
      if (this.form.image !== '') {
          this.areaSrv.uploadImage(this.form.image).subscribe((filename: any) => {
              console.log(filename);
              this.form.image = filename;
              this.createArea(form);
          });
      } else {
          this.createArea(form);
      }
      console.log(this.form);
  }
    selectFile(event) {
        this.form.image = event.target.files[0];
    }
    createArea(form: NgForm) {
        if (this.formtype === 'Create') {
            this.areaSrv.createArea(this.form).subscribe((data: any) => {
                console.log(data);
                this.ngOnInit();
                form.reset();
            });
        }
        if (this.formtype === 'Update') {
            this.areaSrv.updateArea(this.form).subscribe((data: any) => {
                console.log(data);
                this.ngOnInit();
                form.reset();
            });
        }
    }
    updatePrepare(res) {
        this.form.name = res.name;
        this.form.area = res.area;
        this.form.unit = res.unit;
        this.form.isGrowing = res.isGrowing;
        this.form.id = res.id;
        this.formtype = 'Update';
    }
    reset() {
        this.form.name = '';
        this.form.area = '';
        this.form.unit = '';
        this.form.isGrowing = false;
        this.form.id = '';
        this.formtype = 'Create';
        this.file.nativeElement.value = '';
    }
}
