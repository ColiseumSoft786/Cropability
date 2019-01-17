import { Component, OnInit } from '@angular/core';
import {MaterialService} from '../../_services/material.service';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-mat-create',
  templateUrl: './mat-create.component.html',
  styleUrls: ['./mat-create.component.scss']
})
export class MatCreateComponent implements OnInit {
  public category = [ 'Seed',
                      'Growing Medium',
                      'Agrochemical',
                      'Label and Crop Support',
                      'Seeding Container',
                      'Post Harvest Supply',
                      'Plant',
                      'Other Material'];
  public plant_type = ['Vegetable', 'Fruit', 'Herb', 'Flower', 'Tree & Shrub', 'Ornamental Plant', 'Staple Crop', 'Tuber / Root'];
  public seed_unit = ['Seeds', 'Packets', 'Gram', 'Kilogram'];
  public gm_unit = ['Bags', 'Cubic Metre'];
  public plant_unit = ['Units', 'Packets'];
  public agro_unit = ['Packets', 'Bottles', 'Bags'];
  public chemical_type = ['Disinfectant & Sanitizer', 'Fertilizer', 'Hormone & Growth Agent', 'Manure', 'Pesticide'];
  public seeding_container_type = ['Pots', 'Trays'];
  public seed = false;
  public agro = false;
  public gm = false;
  public lcs = false;
  public sc = false;
  public phs = false;
  public plant = false;
  public omat = false;
  public data = {
    category: '',
    name: '',
    type: '',
    quantity: '',
    price: '',
    germination_rate: '',
    producer: '',
    unit: '',
    expiry: '',
    file: '',
    notes: '',
  };
  public cat_error = '';
  public name_error = '';
  constructor(
      public matSrv: MaterialService,
      public router: Router,
      private appSrv: AppService
  ) {
    this.appSrv.pageTitle = 'Materials';
  }

  ngOnInit() {
  }
  changeCategory() {
    if (this.data.category === 'Seed') {
      this.seed = true;
      this.agro = false;
      this.gm = false;
      this.lcs = false;
      this.sc = false;
      this.phs = false;
      this.plant = false;
      this.omat = false;
    }
    if (this.data.category === 'Agrochemical') {
      this.seed = false;
      this.agro = true;
      this.gm = false;
      this.lcs = false;
      this.sc = false;
      this.phs = false;
      this.plant = false;
      this.omat = false;
    }
    if (this.data.category === 'Growing Medium') {
      this.seed = false;
      this.agro = false;
      this.gm = true;
      this.lcs = false;
      this.sc = false;
      this.phs = false;
      this.plant = false;
      this.omat = false;
    }
    if (this.data.category === 'Label and Crop Support') {
      this.seed = false;
      this.agro = false;
      this.gm = false;
      this.lcs = true;
      this.sc = false;
      this.phs = false;
      this.plant = false;
      this.omat = false;
    }
    if (this.data.category === 'Seeding Container') {
      this.seed = false;
      this.agro = false;
      this.gm = false;
      this.lcs = false;
      this.sc = true;
      this.phs = false;
      this.plant = false;
      this.omat = false;
    }
    if (this.data.category === 'Post Harvest Supply') {
      this.seed = false;
      this.agro = false;
      this.gm = false;
      this.lcs = false;
      this.sc = false;
      this.phs = true;
      this.plant = false;
      this.omat = false;
    }
    if (this.data.category === 'Plant') {
      this.seed = false;
      this.agro = false;
      this.gm = false;
      this.lcs = false;
      this.sc = false;
      this.phs = false;
      this.plant = true;
      this.omat = false;
    }
    if (this.data.category === 'Other Material') {
      this.seed = false;
      this.agro = false;
      this.gm = false;
      this.lcs = false;
      this.sc = false;
      this.phs = false;
      this.plant = false;
      this.omat = true;
    }if (this.data.category === '') {
      this.seed = false;
      this.agro = false;
      this.gm = false;
      this.lcs = false;
      this.sc = false;
      this.phs = false;
      this.plant = false;
      this.omat = false;
    }
  }
  submit() {
    if (this.data.category === '') {
        this.cat_error = 'Must select category';
    } else if (this.data.name === '') {
        this.name_error = 'Must enter name';
    } else {
      this.name_error = this.cat_error = '';
      if (this.data.file !== '') {
        this.matSrv.uploadImage(this.data.file).subscribe((filename: any) => {
          console.log(filename);
          this.data.file = filename;
          this.createMat();
        });
      } else {
        this.createMat();
      }
    }
  }
  createMat() {
    this.matSrv.addMaterial(this.data).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/material']);
    });
  }
  selectFile(event) {
    this.data.file = event.target.files[0];
  }

}
