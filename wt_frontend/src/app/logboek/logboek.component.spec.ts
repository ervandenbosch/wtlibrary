import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogboekComponent } from './logboek.component';

describe('LogboekComponent', () => {
  let component: LogboekComponent;
  let fixture: ComponentFixture<LogboekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogboekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogboekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
