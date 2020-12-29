import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UtilityService } from '../../core/service/utility.service';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from './login.service';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UtilityService,
        LoginService
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule {

}
