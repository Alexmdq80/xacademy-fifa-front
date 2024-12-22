import { Routes } from '@angular/router';
import { JugadoresComponent } from './views/jugadores/jugadores.component';

export const routes: Routes = [
    {
        path: 'jugadores',
        component: JugadoresComponent
    },
    // {
    //     path: '', redirectTo: '/', pathMatch: "full"
    // },
    // {
    //     path: '**', redirectTo: '/', pathMatch: "full"
    // }   
];
