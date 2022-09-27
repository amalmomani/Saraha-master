import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileBarComponent } from './userprofile-bar.component';

describe('UserprofileBarComponent', () => {
  let component: UserprofileBarComponent;
  let fixture: ComponentFixture<UserprofileBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserprofileBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserprofileBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
