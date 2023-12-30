import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsectionComponent } from './doctorsection.component';

describe('DoctorsectionComponent', () => {
  let component: DoctorsectionComponent;
  let fixture: ComponentFixture<DoctorsectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsectionComponent]
    });
    fixture = TestBed.createComponent(DoctorsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
