import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnhistoryComponent } from './mijnhistory.component';

describe('MijnhistoryComponent', () => {
  let component: MijnhistoryComponent;
  let fixture: ComponentFixture<MijnhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MijnhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
