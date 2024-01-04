import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayqrComponent } from './displayqr.component';

describe('DisplayqrComponent', () => {
  let component: DisplayqrComponent;
  let fixture: ComponentFixture<DisplayqrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayqrComponent]
    });
    fixture = TestBed.createComponent(DisplayqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
