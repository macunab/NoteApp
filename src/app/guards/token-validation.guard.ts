import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidationGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private route: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isTokenValid(); 
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isTokenValid();
  }

  isTokenValid(): Observable<boolean> {
    return this.authService.tokenValidation()
      .pipe(
        tap( valid => {
          if(!valid) this.route.navigateByUrl('login');
        })
      );
  }
}
