import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditComponent } from './mat-edit.component';

describe('MatEditComponent', () => {
  let component: MatEditComponent;
  let fixture: ComponentFixture<MatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
