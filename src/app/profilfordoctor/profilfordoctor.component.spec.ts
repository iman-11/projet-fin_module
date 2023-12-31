import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilfordoctorComponent } from './profilfordoctor.component';

describe('ProfilfordoctorComponent', () => {
  let component: ProfilfordoctorComponent;
  let fixture: ComponentFixture<ProfilfordoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilfordoctorComponent]
    });
    fixture = TestBed.createComponent(ProfilfordoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
