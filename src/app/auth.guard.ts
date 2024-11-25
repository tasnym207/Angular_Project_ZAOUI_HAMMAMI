import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
const router:Router=inject(Router);
let stateConnexion =localStorage.getItem('state');
if(stateConnexion == 'connected'){
  return true;
}else{
  router.navigate(['/admin']);
  return false;
}
};
