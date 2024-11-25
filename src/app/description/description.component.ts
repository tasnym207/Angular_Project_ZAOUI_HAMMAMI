import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PriceDTPipe } from '../price-dt.pipe';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule,FormsModule,DatePipe,PriceDTPipe],
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  produit: Product[]=[];
  activatedroute: ActivatedRoute = inject(ActivatedRoute);
  private readonly productService: ProductService = inject(ProductService);

  ngOnInit():void |undefined {
    const id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(data => this.produit=data)
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments); // Charger les commentaires dans la variable comments
    }
  }
  message: string = ''; // Variable pour stocker le message saisi
  sentMessage: { text: string; date: Date } | null = null; // Variable pour stocker le dernier message envoyé
  comments: { text: string; date: Date }[] = []; 


  sendMessage() {
    if (this.message.trim()) {
      this.sentMessage = {
        text: this.message,
        date: new Date() //  pour Stockez la date actuelle
      };
      // pour Ajouter le nouveau commentaire à la liste des commentaires
      this.comments.push(this.sentMessage);

      // pour Enregistrer la liste des commentaires dans le local storage
      localStorage.setItem('comments', JSON.stringify(this.comments));

      this.message = '';
    }
  }
}
