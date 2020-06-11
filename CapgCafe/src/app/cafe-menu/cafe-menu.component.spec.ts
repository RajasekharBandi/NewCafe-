import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeMenuComponent } from './cafe-menu.component';

describe('CafeMenuComponent', () => {
  let component: CafeMenuComponent;
  let fixture: ComponentFixture<CafeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
