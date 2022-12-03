import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  user: any;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.populate();
    this.auth.userObserver.subscribe(user => {
      this.user = user;
    })
  }

  populate(): void {
    this.auth.me();
  }

  logout(): void {
    this.user = null;
    this.auth.logout();
  }
}
