import { Component, inject, OnInit } from '@angular/core';
import { Home } from '../home';
import { ProductService } from '../product.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../product';
import { UpperCasePipe } from '@angular/common';
import { PriceDTPipe } from '../price-dt.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,UpperCasePipe,PriceDTPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lesimages: Home[] = [];
  lesproduitsEnfant: Product[] = [];
  lesproduitsFemme: Product[] = [];
  lesproduitsHomme: Product[] = [];
  private readonly home: ProductService = inject(ProductService);
  
  ngOnInit(): void {
    this.home.getHomeImage().subscribe(data => this.lesimages = data);  
      this.home.getProductByCategorie("men").subscribe(data => this.lesproduitsHomme = data.slice(0,3));
      this.home.getProductByCategorie("woman").subscribe(data =>  this.lesproduitsFemme = data.slice(2, 5));
      this.home.getProductByCategorie("kids").subscribe(data => this.lesproduitsEnfant = data.slice(0,3));
  }
}