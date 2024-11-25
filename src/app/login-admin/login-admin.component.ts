import { Component, inject, OnInit } from '@angular/core';
import { Home } from '../home';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'] 
})
export class LoginAdminComponent implements OnInit {
  leslogos: Home[] = [];
  logoSiteImage: String | undefined; 
  loginvibe:String|undefined;
  private readonly logo: ProductService = inject(ProductService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.logo.getLogoImage().subscribe(data => {
      
      const logoArray = data; 
      const logoSite = logoArray.find(item => item.image.includes("logosite.png"));
      const login=logoArray.find(item=>item.image.includes("sportvibes.png")); 
      if (logoSite && login) {
        this.logoSiteImage = logoSite.image;
        this.loginvibe=login.image; 
      }
    
    });
  }
  

  naviguerVersCreerProfil() {
      this.router.navigate(['/inscription']);
  }

  naviguerVersHome() {
    this.router.navigate(['/home']);
}






}