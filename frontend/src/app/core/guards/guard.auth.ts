import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('access_token') !== null) {
      const now = new Date();
      if (now.getTime() / 1000 < this.expiration(localStorage.getItem('access_token'))) {
        return true;
      }
    }
    console.debug('redirects to login page because access token is not here');
    location.href = '/login';
    return false;
  }

  expiration = (token: any) => {
    const parsed = jwt_decode(token) as any;
    return parsed[`exp`];
  }
}