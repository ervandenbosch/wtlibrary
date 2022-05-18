import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplarenComponent } from './exemplaren.component';

describe('ExemplarenComponent', () => {
  let component: ExemplarenComponent;
  let fixture: ComponentFixture<ExemplarenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemplarenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplarenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
