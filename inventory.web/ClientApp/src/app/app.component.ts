import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/service/auth.service';
import { MvNavigation } from './nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isAuthenticated = false;
  navigationList: MvNavigation[];

  constructor(public auth: AuthService) {

  }

  ngOnInit() {

    this.auth.subAuthenticated.subscribe((val) => {

      if (val) {

        this.isAuthenticated = true;
        this.navigationList = this.auth.getTokenValueByKey('Navigation') || [];
      } else if (val !== null) {

        this.isAuthenticated = false;
        this.auth.redirectToLogin();
      }
    });

    // on page refresh
    this.isAuthenticated = this.auth.getLocalStorage('isAuthenticated') || false;
    if (this.isAuthenticated) {

      if (window.location.href.endsWith('/login') || window.location.href.endsWith('/')) {

        this.auth.logout();
        this.isAuthenticated = false;
        this.navigationList = [];
      } else { // if not login page

        this.navigationList = this.auth.getTokenValueByKey('Navigation') || [];
      }
    }
  }
}
