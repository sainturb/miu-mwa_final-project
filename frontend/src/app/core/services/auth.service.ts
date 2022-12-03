import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {environment} from "src/environments/environment";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public userObserver = this.userSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {

  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.host}/users/login`, { username, password })
      .pipe(
        map((res: any) => {
          localStorage.setItem('access_token', res.token);
          return res;
        })
      );
  }

  me(): void {
    this.http.get(`${environment.host}/users/me`).subscribe((user) => this.userSubject.next(user));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
    this.router.navigateByUrl('/login').then();
  }

  get(property: string): string {
    const decoded = jwt_decode(localStorage.getItem('access_token') ?? '') as any;
    return decoded[property];
  }

}
