import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoedkeurModalComponent } from './goedkeur-modal.component';

describe('GoedkeurModalComponent', () => {
  let component: GoedkeurModalComponent;
  let fixture: ComponentFixture<GoedkeurModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoedkeurModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoedkeurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
