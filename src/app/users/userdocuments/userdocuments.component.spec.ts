import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdocumentsComponent } from './userdocuments.component';

describe('UserdocumentsComponent', () => {
  let component: UserdocumentsComponent;
  let fixture: ComponentFixture<UserdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
