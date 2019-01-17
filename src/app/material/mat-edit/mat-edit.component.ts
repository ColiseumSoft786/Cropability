import { Component, OnInit } from '@angular/core';
import {MaterialService} from '../../_services/material.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-mat-edit',
  templateUrl: './mat-edit.component.html',
  styleUrls: ['./mat-edit.component.scss']
})
export class MatEditComponent implements OnInit {
    public url = environment.baseUrl;
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
        public route: ActivatedRoute,
        private appSrv: AppService
    ) {
        this.appSrv.pageTitle = 'Materials';
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.matSrv.getById(id).subscribe((mat: any) => {
          console.log(mat);
          this.data = mat;
          this.data.notes = mat.note;
          this.data.germination_rate = mat.germinationRate;
          this.data.file = '';
            console.log(this.data);
          this.changeCategory();
        });

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
                    this.updateMat();
                });
            } else {
                this.updateMat();
            }
        }
    }
    updateMat() {
      console.log(this.data);
        this.matSrv.editMaterial(this.data).subscribe((data: any) => {
            console.log(data);
            this.router.navigate(['/material']);
        });
    }
    selectFile(event) {
        this.data.file = event.target.files[0];
    }

}
