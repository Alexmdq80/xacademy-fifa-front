import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadoresTablaComponent } from './jugadores-tabla.component';

describe('JugadoresTablaComponent', () => {
  let component: JugadoresTablaComponent;
  let fixture: ComponentFixture<JugadoresTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadoresTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
