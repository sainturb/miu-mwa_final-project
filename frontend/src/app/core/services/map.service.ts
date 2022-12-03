import {HttpClient, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {

  }

  search(search: string): Observable<any> {
    const search_text = search.replace(' ', '%20');
    const params = new HttpParams()
      .append('access_token', environment.mapbox.publicToken)
      .append('country', 'US');
    return this.http.get(`${environment.mapbox.api}${search_text}.json`, {params});
  }
}
