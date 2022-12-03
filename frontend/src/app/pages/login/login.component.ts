import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.auth.login(this.username, this.password).subscribe(res => {
      this.auth.me();
      this.router.navigateByUrl('/home').then();
    })
  }

}
