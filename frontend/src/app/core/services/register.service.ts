import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  signup(data:any): Observable<any> {
    return this.http.post(
      `${environment.host}/users/signup`,data);
  }
}
