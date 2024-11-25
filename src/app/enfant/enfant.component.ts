import { Component, OnInit,inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PriceDTPipe } from '../price-dt.pipe';
@Component({
  selector: 'app-enfant',
  standalone: true,
  imports: [RouterLink,CommonModule,PriceDTPipe],
  templateUrl: './enfant.component.html',
  styleUrl: './enfant.component.css'
})
export class EnfantComponent implements OnInit{
  products:Product[]=[];
  selectedProductId: number | null = null;
  readonly ProduitService:ProductService=inject(ProductService);
  ngOnInit(): void {
      this.displayProducts();
  }
  displayProducts(){
    this.ProduitService.getProductByCategorie("kids")
    .subscribe(data=>this.products=data)
  }
  toggleDetail(productId: number): void {
    if (this.selectedProductId === productId) {
      this.selectedProductId = null; 
    } else {
      this.selectedProductId = productId;
    }
  }
  ajouterProduitAuPanier(produit: Product) {
    this.ProduitService.ajouterAuPanier(produit);
  }
  

}
