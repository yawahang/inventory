import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {

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
    this.fmLogin.updateValueAndValidity();
    if (this.fmLogin.valid) {

      this.mvLogin.Username = this.fmLogin.get('Username').value.trim();
      this.mvLogin.Password = this.fmLogin.get('Password').value.trim();

      this.ls.login(this.mvLogin).subscribe((response: any) => {

        if (response && response['token']) {

          this.token = response['token'];
          this.auth.setToken(this.token);
          this.auth.setLocalStorage('isAuthenticated', true);
          const redirectUrl = this.auth.getTokenValueByKey('RedirectUrl');
          this.auth.subAuthenticated.next(true);

          if (redirectUrl) {

            this.router.navigate([redirectUrl], {
              replaceUrl: true
            });
          } else {

            this.router.navigate([environment.redirectUrl], {
              replaceUrl: true
            });
          }
        } else {

          this.auth.subAuthenticated.next(false);
          this.errorMessage = 'Invalid Username or Password';
        }
      });
    } else {

      this.errorMessage = 'Invalid Form';
    }
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
