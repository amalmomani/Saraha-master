import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileUserComponent } from './view-profile-user.component';

describe('ViewProfileUserComponent', () => {
  let component: ViewProfileUserComponent;
  let fixture: ComponentFixture<ViewProfileUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProfileUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProfileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
