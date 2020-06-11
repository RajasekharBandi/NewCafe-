import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCafeComponent } from './show-cafe.component';

describe('ShowCafeComponent', () => {
  let component: ShowCafeComponent;
  let fixture: ComponentFixture<ShowCafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
