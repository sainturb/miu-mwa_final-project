import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let status = true;
    if (localStorage.getItem('access_token') !== null) {
      const now = new Date();
      status = now.getTime() / 1000 > this.expiration(localStorage.getItem('access_token'));
    }
    if (!status) {
      this.router.navigateByUrl('/home').then();
    }
    return status;
  }

  expiration = (token: any) => {
    const parsed = jwt_decode(token) as any;
    return parsed[`exp`];
  }
}
