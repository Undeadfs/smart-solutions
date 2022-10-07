import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!localStorage.getItem('isLoggedIn')){
      this.router.navigate(['sign-in'])
      return false;
    }

    if(state.url === '/dashboard') {
      this.router.navigate(['/dashboard/task-manager']);
    }

    return true;
  }
  
}
