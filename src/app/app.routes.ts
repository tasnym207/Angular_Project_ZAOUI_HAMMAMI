import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HommeComponent } from './homme/homme.component';
import { DescriptionComponent } from './description/description.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { SearchComponent } from './search/search.component';
import { PanierComponent } from './panier/panier.component';
import { ProduitComponent } from './produit/produit.component';
import { EnfantComponent } from './enfant/enfant.component';
import { CreerProfilComponent } from './creer-profil/creer-profil.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { GererproductComponent } from './gererproduct/gererproduct.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guard';
import { MoncompteComponent } from './moncompte/moncompte.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
{path:'home',title:'Accueil',component:HomeComponent},
{path:'homme',title:'Homme',component:HommeComponent},
{path:'femme',title:'Femme',component:ProduitComponent},
{path:'enfant',title:'Enfant',component:EnfantComponent},
{path: 'homme/:id',title:'produit selected', component: DescriptionComponent },
{path: 'femme/:id',title:'produit selected', component: DescriptionComponent },
{path: 'enfant/:id',title:'produit selected', component: DescriptionComponent },
{path:'login',title:'SportVibes Login',component:LoginAdminComponent},
{path:'search',component:SearchComponent},
{path:'panier',title:'mon panier',component:PanierComponent},
{path:'inscription',title:'creer compte',component:CreerProfilComponent},
{path:'modifierprofil',title:'modifier profil',component:ModifierProfilComponent,canActivate:[authGuard]},
{path:'gererproduit',title:'gerer produits',component:GererproductComponent,canActivate:[authGuard]},
{path:'admin',title:'administration',component:AdminComponent},
{path:'CompteClient',title:'CompteClient',component:MoncompteComponent},
{path:' ' , redirectTo: 'home', pathMatch: 'full'},
{path:'**',title:'error',component:ErrorComponent}







];
