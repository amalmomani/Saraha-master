import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedUserComponent } from './blocked-user.component';

describe('BlockedUserComponent', () => {
  let component: BlockedUserComponent;
  let fixture: ComponentFixture<BlockedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
