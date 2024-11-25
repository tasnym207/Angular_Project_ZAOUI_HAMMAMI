import { Component ,inject} from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-profil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creer-profil.component.html',
  styleUrl: './creer-profil.component.css'
})
export class CreerProfilComponent {
  productForm!:FormGroup;
  readonly formBuilder:FormBuilder=inject(FormBuilder);
 router:Router=inject(Router);
 ngOnInit(): void {
     this.productForm=this.formBuilder.nonNullable.group({
      nom:['',[Validators.required]],
      prenom:['',[Validators.required]],
      email:['',[Validators.required]],
      mdp:['',[Validators.required]]


     })
 }
 get nom(){
  return this.productForm.get('nom');
 }
 get prenom(){
  return this.productForm.get('prenom');
 }
 get email(){
  return this.productForm.get('email');
 }
 get mdp(){
  return this.productForm.get('mdp');
 }
  naviguerVersHome() {
    this.router.navigate(['/home']);
}

onnaviguerVersCompte(){
  this.router.navigate(['/CompteClient']);
}
}
