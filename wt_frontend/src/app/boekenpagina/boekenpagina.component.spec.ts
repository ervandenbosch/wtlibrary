import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekenpaginaComponent } from './boekenpagina.component';

describe('BoekenpaginaComponent', () => {
  let component: BoekenpaginaComponent;
  let fixture: ComponentFixture<BoekenpaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoekenpaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoekenpaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
