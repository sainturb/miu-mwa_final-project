import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/core/services/register.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup} from "@angular/forms";
import { Observable, Subject } from 'rxjs';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  role = 'Customer';
  constructor(private fb: FormBuilder,
              private register: RegisterService ,
              private router: Router,
              private toast: NgToastService) {
    this.signupForm = this.fb.group({
      role:['Customer'],
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      username: [''],
      password: ['']

    })
  }

  ngOnInit(): void {
  }
  signup() {
    if (!this.signupForm.valid) {
      console.log("signup invalid");
      return
    }
    const {role, firstname, lastname, email, phone, username, password } = this.signupForm.value;
    this.register.signup({role, firstname, lastname, email, phone, username, password })
      .subscribe(res => {
        console.log(res);
        this.toast.success({detail: 'Success Message', summary: "Register successfully!", duration: 5000});
        this.router.navigateByUrl('/login');
      }, err => {
        console.log(err.error.error);
        let msErr = err.error.error ? err.error.error : "Something wrong! Try again later!";
        this.toast.error({detail: 'Error Message', summary: msErr, duration:5000});
      });
  }
}
