import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekenlijstComponent } from './boekenlijst.component';

describe('BoekenlijstComponent', () => {
  let component: BoekenlijstComponent;
  let fixture: ComponentFixture<BoekenlijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoekenlijstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoekenlijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
