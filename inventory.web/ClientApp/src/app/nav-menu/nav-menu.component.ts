import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/core/service/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  @Input('navigationList') navigationList: MvNavigation[];
  isExpanded = false;

  constructor(public auth: AuthService
  ) {

  }
  ngOnInit() {

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
