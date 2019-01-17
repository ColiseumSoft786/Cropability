import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReslistComponent } from './reslist.component';

describe('ReslistComponent', () => {
  let component: ReslistComponent;
  let fixture: ComponentFixture<ReslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
