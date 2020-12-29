import { UtilityService } from '../../core/service/utility.service';
import { LoginService } from './login.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MvLogin } from './login.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/core/service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  private _unsubscribeAll: Subject<any>;

  token: any;
  fmLogin: FormGroup;
  errorMessage: any;
  mvLogin: MvLogin = <MvLogin>{};
  hide = true;

  constructor(
    public fb: FormBuilder,
    public ls: LoginService,
    private auth: AuthService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.fmLogin = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  login() {

    this.errorMessage = '';
    if (this.fmLogin.valid) {

      this.mvLogin.Username = this.fmLogin.get('Username').value.trim();
      this.mvLogin.Password = this.fmLogin.get('Password').value.trim();

      const param = {
        data: { ...this.mvLogin }
      };

      this.ls.login(param).subscribe((response: any) => {

        if (response && response['token']) {

          this.token = response['token'];

          this.auth.setToken(this.token);
          this.token = this.auth.getTokenValueByKey('All') || {};

          if (this.token?.RedirectUrl) {

            this.auth.isAuthenticated = true;
            this.auth.authenticated.next(true);
            this.router.navigate([this.token?.RedirectUrl], {
              replaceUrl: true
            });
          } else {

            this.auth.isAuthenticated = false;
            this.auth.authenticated.next(false);
            this.errorMessage = 'Invalid Login';
          }
        } else {

          this.auth.isAuthenticated = false;
          this.auth.authenticated.next(false);
          this.errorMessage = 'Invalid Username or Password';
        }
      });
    } else {

      this.errorMessage = 'Invalid Form';
    }
  }

  ngAfterViewInit() {

    this.fmLogin.updateValueAndValidity();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
