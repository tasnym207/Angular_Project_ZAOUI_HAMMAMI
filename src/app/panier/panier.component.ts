import { Component,inject, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { PriceDTPipe } from '../price-dt.pipe';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [FormsModule,PriceDTPipe],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent  implements OnInit{
produitsajoutee:Product[]=[];
private readonly panierservice :ProductService=inject(ProductService)

ngOnInit() {
  this.panierservice.obtenirProduitsDuPanier().subscribe(produits => {
    this.produitsajoutee = produits; // Met à jour la liste des produits dans le panier
  });
}

calculerTotal(): number {
  let total = 0;

  // Parcourir chaque produit dans le panier
  this.produitsajoutee.forEach((produit, index) => {
    const qteInput = document.getElementById(`qte-${index}`) as HTMLInputElement; 
    const quantite = qteInput ? Number(qteInput.value) : 0;

    
    total += produit.price * quantite;
  });

  return total;
}
supprimerDuPanier(produit: Product) {
  this.produitsajoutee = this.produitsajoutee.filter(p => p.id !== produit.id); 
  this.panierservice.mettreAJourPanier(this.produitsajoutee); // Mettre à jour le service avec la nouvelle liste
}










}
