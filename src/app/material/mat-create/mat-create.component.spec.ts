import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCreateComponent } from './mat-create.component';

describe('MatCreateComponent', () => {
  let component: MatCreateComponent;
  let fixture: ComponentFixture<MatCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
