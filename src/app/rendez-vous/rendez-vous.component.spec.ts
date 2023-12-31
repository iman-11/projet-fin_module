import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousComponent } from './rendez-vous.component';

describe('RendezVousComponent', () => {
  let component: RendezVousComponent;
  let fixture: ComponentFixture<RendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezVousComponent]
    });
    fixture = TestBed.createComponent(RendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
