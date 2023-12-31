import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpatientComponent } from './loginpatient.component';

describe('LoginpatientComponent', () => {
  let component: LoginpatientComponent;
  let fixture: ComponentFixture<LoginpatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginpatientComponent]
    });
    fixture = TestBed.createComponent(LoginpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
