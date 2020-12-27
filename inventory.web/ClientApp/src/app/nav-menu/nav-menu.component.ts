import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/core/services/utility.service';
import { SessionService } from 'src/core/services/session.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  navigationList: MvNavigation[];

  constructor(
    private ses: SessionService,
    private router: Router
  ) {

  }
  ngOnInit(): void {

    this.ses.authenticated.subscribe((valid) => {

      if (valid) {

        this.navigationList = this.ses.getTokenValueByKey('Navigation') || [];
      }
    });
  }

  collapse() {

    this.isExpanded = false;
  }

  toggle() {

    this.isExpanded = !this.isExpanded;
  }

  login() {

    this.router.navigate(['/login']);
  }
}

export interface MvNavigation {
  Navigation: string;
  NavigationId: number;
  Url: string;
}
