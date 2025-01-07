import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { OutlineButtonComponent } from '../outline-button/outline-button.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { MenuItem } from '../model/menu-item.model';

@Component({
    selector: 'app-header',
    imports: [
        OutlineButtonComponent,
        HeaderMenuComponent,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent {
  menuItems: MenuItem[] = [
    // menuItems = [ {...},{...},{...},{...} ]
    // funciona de las dos maneras, sólo que en la que quedó en el código
    // es más clara. Ya que le decimos a Angular que vamos a usar ese modelo de objeto
    // o esa interfaz.
    {text: 'Jugadores', route: '/jugadores'},
  ]
}
