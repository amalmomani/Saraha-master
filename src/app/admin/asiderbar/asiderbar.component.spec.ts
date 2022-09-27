import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiderbarComponent } from './asiderbar.component';

describe('AsiderbarComponent', () => {
  let component: AsiderbarComponent;
  let fixture: ComponentFixture<AsiderbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsiderbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsiderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
