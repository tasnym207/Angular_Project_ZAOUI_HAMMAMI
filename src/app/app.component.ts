import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { MenuComponent } from './menu/menu.component';
import { AproposComponent } from './apropos/apropos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, AproposComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'miniprojet';
}
