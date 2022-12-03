import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { DialogContactComponent } from './dialog-contact/dialog-contact.component';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appointments: any[] = [];
  columns: any[] = ['scheduleDate', 'title', 'price', 'edit', 'contact', 'cancel'];
  property_id: String = '';
  appt_id: String = '';
  selectedDate: any;
  contactInfo: any;



  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAppointmentList();
  }

  getAppointmentList() {
    this.appointmentService.getAppointments()
      .subscribe(res => {
        this.appointments = res;
        console.log(res)
      });
  }

  edit(appointment: any) {
    appointment.schedule = null;
  }


  dateChanged($event: { target: { value: any; }; }) {
    this.selectedDate = $event.target.value;
    console.log($event.target.value)

  }

  contact(property_id: String, appt_id: String) {
    this.appointmentService.contactAppointment(property_id, appt_id).subscribe(result => {
      this.contactInfo = result;
      console.log(result)
      this.dialog.open(DialogContactComponent, {
        width: '250px',
        height: '150px',
        data: {
          dataKey: this.contactInfo
        }
      })
    });

  }

  changeAppointment(property_id: String, appt_id: String) {
    try {
      const formattedDate = `${this.selectedDate.getMonth() + 1}/${this.selectedDate.getDate()}/${this.selectedDate.getFullYear()}`
      const schedule = { "schedule": formattedDate }
      console.log(schedule)
      this.appointmentService.changeAppointment(property_id, appt_id, schedule).subscribe(_ => {
        this.router.navigate(['./appointment']);
        location.reload();
      })
    } catch (error) {
      this.snackBar.open('Date cannot be empty', 'Okay', {
        duration: 3000
      });
    }
  }

  cancelAppointment(property_id: String, appt_id: String) {
    this.appointmentService.cancelAppointment(property_id, appt_id).subscribe(_ => {
      this.getAppointmentList();
    });
  }
}
