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

  constructor(public auth: AuthService
  ) {

  }
  ngOnInit(): void {

    this.auth.authenticated.subscribe((valid) => {

      if (valid) {

        this.navigationList = this.auth.getTokenValueByKey('Navigation') || [];
      }
    });
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
