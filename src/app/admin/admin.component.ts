import { Component ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Donneeadmin } from '../donneeadmin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
private readonly router:Router=inject(Router)
private readonly service:ProductService=inject(ProductService)
username: string = '';
password: string = '';

  // Méthode pour gérer la connexion
   onLogin() {
     this.service.login(this.username, this.password).subscribe(
       isAuthenticated => {
         if (isAuthenticated) { 
          this.router.navigate(['/modifierprofil']); 
        } else { alert("Vérifiez vos informations."); 
          
        } }
      )


}
}
