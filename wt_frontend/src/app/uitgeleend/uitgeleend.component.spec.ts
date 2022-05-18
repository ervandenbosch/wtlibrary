import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UitgeleendComponent } from './uitgeleend.component';

describe('UitgeleendComponent', () => {
  let component: UitgeleendComponent;
  let fixture: ComponentFixture<UitgeleendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UitgeleendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UitgeleendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
