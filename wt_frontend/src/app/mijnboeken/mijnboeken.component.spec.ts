import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnboekenComponent } from './mijnboeken.component';

describe('MijnboekenComponent', () => {
  let component: MijnboekenComponent;
  let fixture: ComponentFixture<MijnboekenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MijnboekenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnboekenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
