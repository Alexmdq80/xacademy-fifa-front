import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// bootstrapApplication(AppComponent, {
//   providers: [provideCharts(withDefaultRegisterables())],
// }).catch((err) => console.error(err));


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
