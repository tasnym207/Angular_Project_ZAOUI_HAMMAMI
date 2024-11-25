import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PriceDTPipe } from '../price-dt.pipe';

@Component({
  selector: 'app-homme',
  standalone: true,
  imports: [RouterLink, CommonModule,PriceDTPipe],
  templateUrl: './homme.component.html',
  styleUrl: './homme.component.css'
})
export class HommeComponent implements OnInit {
  lesproduits: Product[] = [];
  selectedProductId: number | null = null; // Pour suivre le produit sélectionné
  private readonly product: ProductService = inject(ProductService);
  
  ngOnInit(): void {
    this.product.getProductByCategorie("men").subscribe(data => this.lesproduits = data);
  }

  
  toggleDetail(productId: number): void {
    if (this.selectedProductId === productId) {
      this.selectedProductId = null; // Désélectionner si on clique à nouveau
    } else {
      this.selectedProductId = productId; // Sélectionner le nouveau produit
    }
  }
  

  ajouterProduitAuPanier(produit: Product) {
    this.product.ajouterAuPanier(produit);
  }
}