import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveringenComponent } from './reserveringen.component';

describe('ReserveringenComponent', () => {
  let component: ReserveringenComponent;
  let fixture: ComponentFixture<ReserveringenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveringenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveringenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
