import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaiContactusComponent } from './emai-contactus.component';

describe('EmaiContactusComponent', () => {
  let component: EmaiContactusComponent;
  let fixture: ComponentFixture<EmaiContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmaiContactusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmaiContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
