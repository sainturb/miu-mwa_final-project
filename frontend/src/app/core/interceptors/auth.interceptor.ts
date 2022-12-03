import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const headersConfig = {
      'Accept': 'application/json'
    } as any;
    if (req.headers.get('Content-Type')) {
      headersConfig['Content-Type'] = req.headers.get('Content-Type');
    }
    if (!req.url.includes('/upload')) {
      headersConfig['Content-Type'] = 'application/json';
    }
    const token = localStorage.getItem('access_token');
    if (!req.url.includes('https://api.mapbox.com') && token) {
      headersConfig.Authorization = `Bearer ${token}`;
    }
    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request)
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            localStorage.clear();
            this.router.navigateByUrl('/login').then();
          }
          return error;
        }) as any
      );
  }
}
