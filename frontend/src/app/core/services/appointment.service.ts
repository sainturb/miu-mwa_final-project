import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Appointment from 'src/app/pages/appointment/appointmentInterface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }


  getAppointments(): Observable<any> {

    return this.http.get<any>(`${environment.host}/appointments`);

  }



  changeAppointment(property_id: String, appt_id: String, schedule: any) {
    return this.http.patch<any>(`${environment.host}/appointments/${property_id}/${appt_id}`, schedule);
  }

  createAppointment(id: String, schedule: any) {
    return this.http.post<any>(`${environment.host}/appointments/${id}`, schedule);
  }

  cancelAppointment(property_id: String, appt_id: String): Observable<any> {
    return this.http.delete(`${environment.host}/appointments/${property_id}/${appt_id}`);
  }

  contactAppointment(property_id: String, appt_id: String) {
    return this.http.get(`${environment.host}/appointments/contact-info/${property_id}/${appt_id}`);
  }

}
