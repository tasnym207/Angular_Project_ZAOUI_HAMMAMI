import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  searchQuery: string | null = '';  
  price: number | null = null; 
  router: Router = inject(Router);

  

  onsearch() {
    this.router.navigate(['/search', { name: this.searchQuery, price: this.price }]);
  }
}