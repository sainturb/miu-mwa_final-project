
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private http: HttpClient) {

  }

  fetchAll(): Observable<any> {
    return this.http.get(`${environment.host}/properties`);
  }

  search(query: any): Observable<any> {
    Object.keys(query).forEach(key => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });
    return this.http.get(`${environment.host}/properties`, {params: query});
  }

  addProperty(payload: any): Observable<any> {
    return this.http.post(`${environment.host}/properties`, payload);
  }

  findNear(lng: number, lat: number, filter?: any): Observable<any> {
    return this.http.get(`${environment.host}/properties/50000/${lng}/${lat}/findNear`);
  }

  myProperties(): Observable<any> {
    return this.http.get(`${environment.host}/properties/owner/all`);
  }

  getPropertyById(id: String): Observable<any> {
    return this.http.get(`${environment.host}/properties/${id}`);
  }

  deleteProperty(id: string): Observable<any> {
    return  this.http.delete(`${environment.host}/properties/${id}`)
  }

  patchProperty(id: string, payload: any): Observable<any> {
    return  this.http.patch(`${environment.host}/properties/${id}`, payload);
  }

}
