import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresModalComponent } from './jugadores-modal.component';

describe('JugadoresModalComponent', () => {
  let component: JugadoresModalComponent;
  let fixture: ComponentFixture<JugadoresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
