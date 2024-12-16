import { Component } from '@angular/core';
import { HeaderComponent } from "./core/header/header.component";
// import { LandingPageComponent } from "./views/landing-page/landing-page.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,
            CommonModule,
            HeaderComponent  
            // LandingPageComponent
            ]
})
export class AppComponent {
  title = 'FIFA Players';
}
