import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyEmailToPasswordComponent } from './verfiy-email-to-password.component';

describe('VerfiyEmailToPasswordComponent', () => {
  let component: VerfiyEmailToPasswordComponent;
  let fixture: ComponentFixture<VerfiyEmailToPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerfiyEmailToPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiyEmailToPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
