import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfkeurModalComponent } from './afkeur-modal.component';

describe('AfkeurModalComponent', () => {
  let component: AfkeurModalComponent;
  let fixture: ComponentFixture<AfkeurModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfkeurModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfkeurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
