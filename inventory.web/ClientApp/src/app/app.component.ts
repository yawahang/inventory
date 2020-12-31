import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isAuthenticated = false;

  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {

    this.isAuthenticated = this.auth.getLocalStorage('isAuthenticated') || false;
  }
}
