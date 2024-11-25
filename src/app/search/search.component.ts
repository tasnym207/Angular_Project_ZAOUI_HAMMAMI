import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PriceDTPipe } from '../price-dt.pipe';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [PriceDTPipe],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  produits: Product[] = [];  
  searchQuery: string = ''; 
  price: number | null = null;

  private readonly productService: ProductService = inject(ProductService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.searchQuery = params['name'] || ''; // Valeur par défaut vide
      this.price = params['price'] ? +params['price'] : null; 
  
      // Réinitialiser la liste des produits avant de faire de nouvelles recherches
      this.produits = [];
  
      // Si un prix a été fourni, filtrer les produits par prix
      if (this.price !== null) {
        this.productService.filterProductsByLowerPrice(this.price).subscribe(data => {
          this.produits = data; // Met à jour la liste des produits
        });
      }
  
      // Si un libellé a été fourni, filtrer les produits par libellé
      if (this.searchQuery) {
        this.productService.filterProductsByLabelOrCharacter(this.searchQuery).subscribe(data => {
          this.produits = this.produits.concat(data);
        });
      }
       // Si un libellé et un prix  ont été fournis, filtrer les produits par libellé et prix
      if(this.searchQuery && this.price!==null){
        this.productService.filterProductByNameAndPrice(this.searchQuery,this.price).subscribe(data=>{
          this.produits=data;
        })
      }
    });
  }
}