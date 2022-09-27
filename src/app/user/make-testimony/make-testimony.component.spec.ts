import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTestimonyComponent } from './make-testimony.component';

describe('MakeTestimonyComponent', () => {
  let component: MakeTestimonyComponent;
  let fixture: ComponentFixture<MakeTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeTestimonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
