import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidationErrors  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agregar-persona',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.scss'
})
export class AgregarPersonaComponent {
  playerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.playerForm = this.fb.group({
      longName: ['', Validators.required, this.nameValidator],
      age: ['', [Validators.required, Validators.min(15)]],
      gender: [''], 
      heightCm: ['', Validators.required], 
      weightKg: ['', Validators.required], 
      nationalityName: ['', Validators.required],
      clubName: ['', Validators.required],
      fifaVersion: [''], 
      fifaUpdate: [''], 
      playerFaceUrl: [''],
      playerPositions: [''], 
      valueEur: ['', Validators.required, Validators.min(0)], // Validaciones para valor
      wageEur: ['', Validators.required, Validators.min(0)], // Validaciones para salario
      potential: ['', Validators.required, Validators.min(0), Validators.max(100)], // Validaciones para potencial
      overall: ['', Validators.required],
      preferredFoot: [''], 
      weakFoot: ['', Validators.required, Validators.min(1), Validators.max(5)],
      skillMoves: ['', Validators.required, Validators.min(1), Validators.max(5)],
      internationalReputation: ['', Validators.required, Validators.min(1), Validators.max(5)],
      workRate: [''], 
      bodyType: [''], 
      pace: ['', Validators.required, Validators.min(0), Validators.max(99)], 
      shooting: ['', Validators.required, Validators.min(0), Validators.max(99)],
      passing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      dribbling: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defending: ['', Validators.required, Validators.min(0), Validators.max(99)],
      physic: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingCrossing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingFinishing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingHeadingAccuracy: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingShortPassing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingVolleys: ['', Validators.required, Validators.min(0), Validators.max(99)],      
      skillDribbling: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillCurve: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillFkAccuracy: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillLongPassing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillBallControl: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementAcceleration: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementSprintSpeed: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementAgility: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementReactions: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementBalance: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerShotPower: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerJumping: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerStamina: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerStrength: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerLongShots: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityAggression: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityInterceptions: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityPositioning: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityVision: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityPenalties: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityComposure: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defendingMarking: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defendingStandingTackle: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defendingSlidingTackle: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingDiving: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingHandling: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingKicking: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingPositioning: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingReflexes: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingSpeed: ['', Validators.required, Validators.min(0), Validators.max(99)],
      playerTraits: [''], 
    });
  };

  async nameValidator(control: AbstractControl) {
    const nameRegex = /^[a-zA-ZçÇà-ÿ'`'\s]+$/;

    return nameRegex.test(control.value) ? null : { nameInvalid: { value: control.value } };
  }
    
  onSubmit() {


  }
  // get nombre() {
  //   return this.playerForm.get('longName');
  // };


}


