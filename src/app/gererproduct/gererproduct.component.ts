import { Component ,inject, OnInit} from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormBuilder, ReactiveFormsModule ,FormGroup, Validators, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-gererproduct',
  standalone: true,
  imports: [ReactiveFormsModule,UpperCasePipe,FormsModule,CommonModule],
  templateUrl: './gererproduct.component.html',
  styleUrl: './gererproduct.component.css'
})
export class GererproductComponent implements OnInit {
products :Product[]=[];
lesproduitsEnfant: Product[] = [];
lesproduitsFemme: Product[] = [];
lesproduitsHomme: Product[] = [];
produitService:ProductService=inject(ProductService);
readonly fb: FormBuilder = inject(FormBuilder);
productForm!: FormGroup;
readonly router: Router = inject(Router);
searchQuery: string | null = '';
modifyForm!: FormGroup;
deleteForm!: FormGroup;


ngOnInit(): void {
    this.productForm=this.fb.nonNullable.group({
      id:[],
      name_article:['',[Validators.required]],
      image_article:['',[Validators.required]],
      price:[0,[Validators.required]],
      in_stock:[true],
      categorie:['',[Validators.required]],
      Description:['',[Validators.required]]
    });
    this.deleteForm=this.fb.group({
      id:[0,[Validators.required]]
    })
    
    this.modifyForm=this.fb.group({
      id:[0,[Validators.required]],
      price:[0,[Validators.required]],
      in_stock:[true,[Validators.required]]
    });
    
    this.produitService.getProducts().subscribe(data => {
      this.products = data;
      this.initializeProductId();
    });
  
 
  }

  initializeProductId() {
    if (this.products.length > 0) {
      const lastProduct = this.products[this.products.length - 1];
      this.productForm.get('id')?.setValue(lastProduct.id + 1); 
    } else {
      this.productForm.get('id')?.setValue(1);
    }
  }

  get id(){
    return this.productForm.get('id');
  }
  get name_article(){
    return this.productForm.get('name_article');
  }
  get image_article(){
    return this.productForm.get('image_article');
  }
get categorie(){
  return this.productForm.get('categorie');
}
get description(){
  return this.productForm.get('Description');
}

get productId(){
  return this.modifyForm.get('id');
}
get price(){
  return this.modifyForm.get('price');
}
get in_stock(){
  return this.modifyForm.get('in_stock');
}




onSubmit(){
  this.produitService.addProduct(this.productForm.value).subscribe(data=>{this.products.push(data);
    alert("produit ajouter");
    this.onResetForm
  })
}
onResetForm(){
  this.productForm.reset();
  this.productForm.get('id')?.setValue(this.products.length+1);
}
onSupprimeProduct(idn:string){
  const id=Number(idn);
 this.produitService.deleteProduct(id).subscribe();
 alert("produit supprimé");
}
onModifierProduct(): void {
  // Récupérer les valeurs du formulaire
  const { id, price, in_stock } = this.modifyForm.value;

  const idn = Number(id);
  const updatedFields: Partial<{ price: number; in_stock: boolean }> = {};

  if (price) {
    updatedFields.price = Number(price);
  }
  if (in_stock) {
    updatedFields.in_stock = in_stock ;
  }
  this.produitService.updateProductPartial(idn, updatedFields).subscribe();
  
  alert("produit modifier");
}
onDisconnect(){
  localStorage.setItem('state','not connected');
  this.router.navigate(['/admin']);
}
displayProductKids(){
  this.produitService.getProductByCategorie("kids").subscribe(data => this.lesproduitsEnfant = data);
}
displayProductMen(){
  this.produitService.getProductByCategorie("men").subscribe(data => this.lesproduitsHomme = data);
}
displayProductWomen(){
  this.produitService.getProductByCategorie("woman").subscribe(data =>  this.lesproduitsFemme = data);
}

onSearch() {
  this.router.navigate(['/search', { name: this.searchQuery}]);
}

}
