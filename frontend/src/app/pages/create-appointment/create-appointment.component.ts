import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { PropertyService } from 'src/app/core/services/property.service';
import { AppointmentRoutingModule } from '../appointment/appointment-routing.module';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  property_id: String = '';
  property: any;
  selectedDate: any;
  createAppt!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private propService: PropertyService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.property_id = params['property_id'];
      })


    this.propService.getPropertyById(this.property_id).subscribe(response => {
      this.property = response;
      console.log(this.property)
    })


  }

  dateChanged($event: { target: { value: any; }; }) {
    this.selectedDate = $event.target.value;
    console.log($event.target.value)
  }

  createAppointment() {
    try {
      const formattedDate = `${this.selectedDate.getMonth()}/${this.selectedDate.getDate()}/${this.selectedDate.getFullYear()}`
      const schedule = { "schedule": formattedDate }
      this.appointmentService.createAppointment(this.property_id, schedule).subscribe(_ => {
        this.router.navigate(['./appointment']);
      })
    } catch (error) {
      this.snackBar.open('Date cannot be empty', 'Okay', {
        duration: 3000
      });
    }
  }



}
