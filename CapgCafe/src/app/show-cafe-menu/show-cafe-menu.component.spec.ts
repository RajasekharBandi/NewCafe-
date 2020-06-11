import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCafeMenuComponent } from './show-cafe-menu.component';

describe('ShowCafeMenuComponent', () => {
  let component: ShowCafeMenuComponent;
  let fixture: ComponentFixture<ShowCafeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCafeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCafeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
