import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { WebApiService } from 'src/core/services/web-api.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  navigationList: MvNavigation[];

  constructor(
    public asr: AuthService,
    private router: Router,
    private api: WebApiService
  ) {

  }
  ngOnInit(): void {

    this.asr.authenticated.subscribe((valid) => {

      if (valid) {

        this.navigationList = this.asr.getTokenValueByKey('Navigation') || [];
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

  logout() {

    const ret = this.api.post('Account/Logout');

    localStorage.clear();
    sessionStorage.clear();

    this.ngxCache.clearCache();
    this.authenticated.next(false);

    window.history.replaceState({}, 'login', '/login/');
    window.location.href = `${environment.webUrl}login/`;
    return ret;
  }
}

export interface MvNavigation {
  Navigation: string;
  NavigationId: number;
  Url: string;
}
