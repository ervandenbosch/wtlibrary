import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BevestigingReserveringComponent } from './bevestiging-reservering.component';

describe('BevestigingReserveringComponent', () => {
  let component: BevestigingReserveringComponent;
  let fixture: ComponentFixture<BevestigingReserveringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BevestigingReserveringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BevestigingReserveringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
