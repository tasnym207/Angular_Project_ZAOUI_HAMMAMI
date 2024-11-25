import { Component, OnInit ,inject} from '@angular/core';

import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modifier-profil',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './modifier-profil.component.html',
  styleUrl: './modifier-profil.component.css'
})
export class ModifierProfilComponent implements OnInit {
  productForm!:FormGroup;
readonly formBuilder:FormBuilder=inject(FormBuilder);
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({ 
      mdp: ['', [ Validators.minLength(9), Validators.pattern(/^[A-Z].*$/) ]] 
    });
}

 get mdp(){
  return this.productForm.get('mdp');
 }
 public isValidValue() {
  
  return this.productForm.get('mdp')?.errors?.['minLength'] && this.productForm.controls['mdp'].touched ;
}
public isValidPattern(){
  return this.productForm.get('mdp')?.errors?.['pattern'] && this.productForm.controls['mdp'].touched;
}
  username: string = 'admin'; // pour s'assurer que c'est le bon utilisateur
  newPassword: string = '';
  confirmNewPassword: string = '';
  constructor(private authService: ProductService, private router: Router) { }
  onChangePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      this.authService.changePassword(this.username, this.newPassword).subscribe(
        success => {
          if (success) {
            alert("Mot de passe modifié avec succès.");
            this.router.navigate(['/gererproduit']);
          } else { alert("Erreur lors de la modification du mot de passe."); }
        },);
    } else { alert("Les mots de passe ne correspondent pas."); }
  }

  onDisconnect(){
    localStorage.setItem('state','not connected');
    this.router.navigate(['/admin']);
  }
  naviguerVersHome() {
    this.router.navigate(['/home']);
  }

}
