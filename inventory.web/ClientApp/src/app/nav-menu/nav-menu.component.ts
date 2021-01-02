import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/service/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  navigationList: MvNavigation[];
  isAuthenticated = false;

  constructor(public auth: AuthService
  ) {

  }
  ngOnInit(): void {

    this.auth.subAuthenticated.subscribe((val) => {

      if (val) {

        this.navigationList = this.auth.getTokenValueByKey('Navigation') || [];
      } else if (val !== null) {

        this.auth.redirectToLogin();
      }
    });

    this.isAuthenticated = this.auth.getLocalStorage('isAuthenticated') || false;
    if (this.isAuthenticated) {

      this.navigationList = this.auth.getTokenValueByKey('Navigation') || [];
    } else {

      this.auth.redirectToLogin();
    }
  }

  collapse() {

    this.isExpanded = false;
  }

  toggle() {

    this.isExpanded = !this.isExpanded;
  }
}

export interface MvNavigation {
  Navigation: string;
  NavigationId: number;
  Url: string;
}
