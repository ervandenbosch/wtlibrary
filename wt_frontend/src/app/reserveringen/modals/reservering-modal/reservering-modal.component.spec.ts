import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveringModalComponent } from './reservering-modal.component';

describe('GoedkeurModalComponent', () => {
  let component: ReserveringModalComponent;
  let fixture: ComponentFixture<ReserveringModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveringModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveringModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
