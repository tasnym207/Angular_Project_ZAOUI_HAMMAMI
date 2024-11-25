import { Injectable, inject } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Home } from './home';
import { map, catchError } from 'rxjs';
import { Donneeadmin } from './donneeadmin';
import { of } from 'rxjs';
const URL = "http://localhost:3000/products";
const URL_HOME = "http://localhost:3000/home";
const URL_LOGO = "http://localhost:3000/logo";
const URL_ADMIN_DATA = "http://localhost:3000/donneeadmin";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http: HttpClient = inject(HttpClient);
  private panier: Product[] = [];
  private adminData: Donneeadmin[] = [];
  private panierSubject = new BehaviorSubject<Product[]>(this.panier);
  foundUser: any;


  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(URL)
  }

  public getProductByCategorie(categorie: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${URL}?categorie=${categorie}`);
  }

  public getHomeImage(): Observable<Home[]> {
    return this.http.get<Home[]>(URL_HOME)
  }

  public getLogoImage(): Observable<Home[]> {
    return this.http.get<Home[]>(URL_LOGO)
  }

  public getProductById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${URL}?id=${id}`);
  }

  public obtenirProduitsDuLocalStorage(): Product[] {
    const produits = localStorage.getItem('panier');
    return produits ? JSON.parse(produits) : []; // Retourne un tableau de produits ou un tableau vide
  }

  // Méthode pour obtenir les produits du panier
  public obtenirProduitsDuPanier() {
    return this.panierSubject.asObservable(); // Retourne un observable
  }

  // Méthode pour ajouter un produit au panier
  public ajouterAuPanier(produit: Product) {
    const panier = this.obtenirProduitsDuLocalStorage();
    panier.push(produit);
    this.sauvegarderDansLocalStorage(panier);
    this.panierSubject.next([...panier]); // Émet une nouvelle copie du tableau
  }

  // Méthode pour mettre à jour le panier
  public mettreAJourPanier(nouvelleListe: Product[]) {
    this.sauvegarderDansLocalStorage(nouvelleListe);
    this.panierSubject.next([...nouvelleListe]); // Émet la nouvelle liste
  }

  // Méthode pour sauvegarder le panier dans le localStorage
  public sauvegarderDansLocalStorage(panier: Product[]) {
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(URL, product);
  }

  public filterProductsByLabelOrCharacter(searchTerm: string): Observable<Product[]> {
    // Vérifie si le terme de recherche est fourni
    if (!searchTerm) {
      alert("aucun produit trouvé par ce libellé");
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); 
    return this.getProducts().pipe(
      map(products => products.filter(product =>
        product.name_article.toLowerCase().includes(lowerCaseSearchTerm)
    
      ))
    );
  }
  public filterProductsByLowerPrice(price: number) {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.price <= price))
    );
  }
  public filterProductByNameAndPrice(searchTerm: string, prix: number): Observable<Product[]> {
    if (!searchTerm && !prix) {
        alert("aucun produit trouvé par ce libellé et par ce prix");
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase(); 
    return this.getProducts().pipe(
        map(products => products.filter(product => {
            const matchesName = product.name_article.toLowerCase().includes(lowerCaseSearchTerm);
            const matchesPrice = prix ? product.price == prix : true; // Si prix est défini, vérifier le prix, sinon passer
            return matchesName && matchesPrice; // Retourner vrai si les deux conditions sont remplies
        }))
    );
}

  public deleteProduct(id: number) {
    return this.http.delete(URL + "/" + id);
  }
  updateProductPartial(id: number, updatedFields: Partial<{ price: number; in_stock: boolean }>): Observable<any> {
    return this.http.patch<any>(`${URL}/${id}`, updatedFields);
  }

  public getDonneeAdmin() {
    return this.http.get<Donneeadmin[]>(URL_ADMIN_DATA);

  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(URL_ADMIN_DATA).pipe(
      map(data => {
        const foundUser = data.find(item => item.login === username && item.password === password);
        if (foundUser) {
          localStorage.setItem("state", "connected");
          console.log("Connexion réussie");
          return true;
        }
        else {
          localStorage.setItem("state", "not connected");
          console.log("Échec de la connexion");
          return false;
        }
      })
    );
  }


  changePassword(username: string, newPassword: string): Observable<Donneeadmin[]> {
    const foundUser = this.adminData.find(item => item.login === username);
    if (foundUser) {
      foundUser.password = newPassword;
      return this.http.put<Donneeadmin[]>(URL_ADMIN_DATA, this.adminData);
    } else {
      // Retourner vide si utilisateur n'est pas trouvé
      return of([]);
    }
  }

  logout() {
    localStorage.setItem('state', 'not connected');
  }




}
