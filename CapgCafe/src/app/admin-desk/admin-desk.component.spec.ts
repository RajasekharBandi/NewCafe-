import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeskComponent } from './admin-desk.component';

describe('AdminDeskComponent', () => {
  let component: AdminDeskComponent;
  let fixture: ComponentFixture<AdminDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
