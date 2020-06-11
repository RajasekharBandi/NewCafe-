import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArabianComponent } from './arabian.component';

describe('ArabianComponent', () => {
  let component: ArabianComponent;
  let fixture: ComponentFixture<ArabianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArabianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArabianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
