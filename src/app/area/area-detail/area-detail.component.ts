import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AreaService} from '../../_services/area.service';
import {AppService} from '../../app.service';
import {environment} from '../../../environments/environment';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReservoirService} from '../../_services/reservoir.service';
import {ZoneService} from '../../_services/zone.service';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['../../../vendor/styles/pages/projects.scss', './area-detail.component.scss']
})
export class AreaDetailComponent implements OnInit {
  private id;
  public area: any;
  public url = environment.baseUrl;
    public form = {
        name: '',
        reservoirId: '',
        growingMedium: '',
        boards: 0,
        holes: 0,
        area_total: '',
        image: '',
        unit: '',
        isActive: true,
        isGrowing: true,
        areaId: 0
    };
    public zones = [];
    public reservoirs = [];
    public growingMediums = ['NFT Channel', 'DFT Board', 'Soil'];
    public holes = false;
    public remainingArea = 0;
    public areamaxerror = false;


    // Tags
    taskTags = {
        clients: { title: 'Clients', color: 'success' },
        important: { title: 'Important', color: 'danger' },
        social: { title: 'Social', color: 'info' },
        other: { title: 'Other', color: 'warning' }
    };

    projectData = {
        title: 'Website development',
        status: 1,
        priority: 1,
        tasks: 44,
        completedTasks: 29,

        description: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque magna augue, euismod at tortor et, laoreet maximus risus. Ut neque felis, luctus ut rhoncus id, elementum vitae lorem. Ut ac turpis sit amet lorem volutpat tincidunt. Vestibulum dui sapien, porttitor eget pellentesque id, ultrices id ipsum. Nam augue mi, maximus ut tortor et, fermentum efficitur diam. Suspendisse eget urna lorem. Fusce ligula augue, malesuada ullamcorper est nec, commodo laoreet tellus.</p>
    <p>Proin imperdiet purus et lectus luctus, rutrum fermentum lorem molestie. Nam urna felis, elementum elementum placerat id, fermentum ac urna. Etiam libero sem, porttitor ultrices efficitur condimentum, lobortis sit amet enim. Sed vitae orci nulla.</p>
    <p>Cras ultrices, dui id vulputate laoreet, diam orci semper ipsum, a aliquet nunc quam vitae turpis. Donec cursus tortor nec turpis semper, ac luctus mauris sagittis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    <p>Aliquam ornare nisl semper nisl porttitor commodo vel vel libero. Pellentesque faucibus, nisl vel luctus porttitor, leo felis pellentesque augue, dignissim tempus risus odio sed lorem. Nunc nec malesuada nunc, ut mollis dui. Vestibulum ac lacinia massa. Phasellus eget purus nisi. Quisque sodales, tortor et elementum dapibus, nisl urna hendrerit metus, a rhoncus magna sem in libero. Aliquam mattis erat ut diam viverra, quis iaculis sem pulvinar. Vivamus ut mi vitae arcu finibus convallis. Nulla turpis lacus, tempor et sagittis non, egestas nec ante.</p>
    <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque pharetra turpis non aliquet ornare. Duis euismod ultricies est sed auctor. Sed luctus accumsan enim ut efficitur.</p>
    `,

        created: '02/01/2018',
        lastUpdate: '02/18/2018',
        deadline: '03/12/2018',

        hourRate: 35,
        hours: 74,

        tags: ['Development', 'Frontend', 'Backend', 'Design'],

        createdBy: {
            name: 'Mae Gibson'
        },

        client: {
            name: 'Company Ltd.'
        },

        leaders: [
            { avatar: '1-small.png', name: 'Mike Greene' }
        ],

        team: [
            { avatar: '2-small.png', name: 'Leon Wilson' },
            { avatar: '3-small.png', name: 'Allie Rodriguez' },
            { avatar: '4-small.png', name: 'Kenneth Frazier' },
            { avatar: '5-small.png', name: 'Nellie Maxwell' }
        ],

        attachments: [
            { name: 'image_1.jpg', size: '527KB', path: 'assets/img/bg/5.jpg' },
            { name: 'image_2.jpg', size: '269KB', path: 'assets/img/bg/6.jpg' },
            { name: 'assignment_letter.pdf', size: '156KB', path: '/path/to/assignment_letter.pdf' },
            { name: 'app_update.zip', size: '1.35MB', path: '/path/to/app_update.zip' }
        ],

        taskSections: [{
            title: 'Frontend',
            tasks: [
                { text: 'Update User profile page', tags: ['other'], completed: false },
                { text: 'Add images to the product gallery', completed: false },
                { text: 'Create invoice template', completed: false }
            ]
        }, {
            title: 'Backend',
            tasks: [
                { text: 'New blog layout', tags: ['clients'], completed: false },
                { text: 'Create UI design model', completed: false },
                { text: 'Help Web devs with HTML integration', completed: false },
                { text: 'New icons set for an iOS app', completed: false },
                { text: 'Create ad campaign banners set', completed: false },
                { text: 'Edit the draft for the icons', completed: false },
                { text: 'Fix validation issues and commit', tags: ['important'], completed: false },
                { text: 'Support tickets list doesn\'t support commas', completed: false }
            ]
        }],

        discussion: [{
            text: 'Pellentesque faucibus, nisl vel luctus porttitor, leo felis pellentesque augue, dignissim tempus risus odio sed lorem. Nunc nec malesuada nunc, ut mollis dui.',
            date: '2:33 am',
            user: { avatar: '1-small.png', name: 'Mike Greene' }
        }, {
            text: 'Quisque sodales, tortor et elementum dapibus, nisl urna hendrerit metus, a rhoncus magna sem in libero.',
            date: '2:34 am',
            user: { avatar: '5-small.png', name: 'Nelle Maxwell' }
        }, {
            text: 'Cum ea graeci tractatos.',
            date: '2:38 am',
            user: { avatar: '1-small.png', name: 'Mike Greene' }
        }, {
            text: 'Cras ultrices, dui id vulputate laoreet, diam orci semper ipsum, a aliquet nunc quam vitae turpis. Donec cursus tortor nec turpis semper, ac luctus mauris sagittis.',
            date: '2:38 am',
            user: { avatar: '2-small.png', name: 'Leon Wilson' }
        }, {
            text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            date: '2:38 am',
            user: { avatar: '3-small.png', name: 'Allie Rodriguez' }
        }, {
            text: 'Aliquam ornare nisl semper nisl porttitor commodo vel vel libero.',
            date: '2:38 am',
            user: { avatar: '5-small.png', name: 'Kenneth Frazier' }
        }],

        activities: [{
            type: 'new_task',
            date: '2 hours',
            user: { avatar: '1-small.png', name: 'Mike Greene' },
            data: { taskTitle: 'Create invoice template' }
        }, {
            type: 'pushed_commit',
            date: '2 hours',
            user: { avatar: '2-small.png', name: 'Leon Wilson' },
            data: { commitId: 950458 }
        }, {
            type: 'pushed_commit',
            date: '2 hours',
            user: { avatar: '3-small.png', name: 'Allie Rodriguez' },
            data: { commitId: 950457 }
        }, {
            type: 'pushed_commit',
            date: '2 hours',
            user: { avatar: '5-small.png', name: 'Nellie Maxwell' },
            data: { commitId: 950456 }
        }, {
            type: 'completed_task',
            date: '2 hours',
            user: { avatar: '4-small.png', name: 'Kenneth Frazier' },
            data: { taskTitle: 'Google AdWords campain graphics' }
        }, {
            type: 'pushed_commit',
            date: '2 hours',
            user: { avatar: '4-small.png', name: 'Kenneth Frazier' },
            data: { commitId: 950455 }
        }, {
            type: 'new_task',
            date: '2 hours',
            user: { avatar: '5-small.png', name: 'Nellie Maxwell' },
            data: { taskTitle: 'Edit the draft for the icons' }
        }, {
            type: 'new_participant',
            date: '2 hours',
            user: { avatar: '1-small.png', name: 'Mike Greene' },
            data: { userName: 'Nellie Maxwell' }
        }]
    };

    sortablejsOptions: Object = {
        animation: 150,
        handle: '.project-task-handle',
        group: {
            name: 'project-task-list',
            put: true,
            pull: true
        }
    };
  constructor(
      private ar: ActivatedRoute,
      private areaSrv: AreaService,
      public appService: AppService,
      private modalService: NgbModal,
      private resSrv: ReservoirService,
      private zoneSrv: ZoneService
  ) { }

  ngOnInit() {
      this.id = this.ar.snapshot.params['id'];
      this.areaSrv.getById(this.id).subscribe((data: any) => {
        this.area = data;
        this.appService.pageTitle = this.area.name;
        this.form.unit = this.area.unit;
        this.form.areaId = this.area.id;
        this.areaSrv.getZones(this.area.id).subscribe((zones: any) => {
           this.zones = zones;
           console.log(this.zones);
           this.calculateRemainingArea();
        });
      });
      this.resSrv.getAll().subscribe((data: any) => {
          this.reservoirs = data;
      });
  }
  calculatePercentage(val1, val2) {
      const per = ((val1 / val2) * 100).toFixed(1);
      return 100 - parseFloat(per);
  }
  calculateRemainingArea() {
      let totalZoneArea = 0;
      this.zones.forEach((item) => {
          totalZoneArea += parseInt(item.area_total);
      });
      this.remainingArea = this.area.area - totalZoneArea;
  }
    open(content, options = {}) {
        this.modalService.open(content, options).result.then((result) => {
            console.log(`Closed with: ${result}`);
        }, (reason) => {
            console.log(`Dismissed ${this.getDismissReason(reason)}`);
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    checkGM() {
        if (this.form.growingMedium === 'Soil' || this.form.growingMedium === '') {
            this.holes = false;
        } else {
            this.holes = true;
        }
    }
    createZoneCheck(form) {
      if (parseInt(this.form.area_total) >= this.remainingArea) {
          this.areamaxerror = true;
      } else {
          this.areamaxerror = false;
          if (this.form.image !== '') {
              this.zoneSrv.uploadImage(this.form.image).subscribe((filename: any) => {
                  console.log(filename);
                  this.form.image = filename;
                  this.createZone(form);
              });
          } else {
              this.createZone(form);
          }
          console.log(this.form);
      }

    }
    createZone(form) {
        this.zoneSrv.create(this.form).subscribe((zones: any) => {
            console.log(zones);
            this.zones = zones;
            this.calculateRemainingArea();
            form.reset();
            this.resetCreateZoneForm();
            this.checkGM();
        });
    }
    resetCreateZoneForm() {
        this.form.name = '';
        this.form.reservoirId = '';
        this.form.growingMedium = '';
        this.form.boards = 0;
        this.form.holes = 0;
        this.form.area_total = '';
        this.form.unit = '';
        this.form.isActive = true;
        this.form.isGrowing = true;
    }
    selectFile(event) {
        this.form.image = event.target.files[0];
    }

}
