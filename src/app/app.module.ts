import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './Services/auth.service';
import {AuthGuard} from './Guard/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import { ListComponent } from './users/list/list.component';
import { RoleslistComponent } from './users/roles/roleslist/roleslist.component';
import { RolecreateComponent } from './users/roles/rolecreate/rolecreate.component';
import {ToastrModule} from 'ngx-toastr';
import { RoleeditComponent } from './users/roles/roleedit/roleedit.component';
import { UsercreateComponent } from './users/usercreate/usercreate.component';
import { UsereditComponent } from './users/useredit/useredit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserdocumentsComponent } from './users/userdocuments/userdocuments.component';

// *******************************************************************************
//

@NgModule({
    declarations: [
        AppComponent,

        // Pages
        HomeComponent,
        Page2Component,
        LoginComponent,
        RegisterComponent,
        ListComponent,
        RoleslistComponent,
        RolecreateComponent,
        RoleeditComponent,
        UsercreateComponent,
        UsereditComponent,
        ProfileComponent,
        UserdocumentsComponent
    ],

    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        // App
        AppRoutingModule,
        LayoutModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        })
    ],

    providers: [
        Title,
        AppService,
        AuthService,
        AuthGuard
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }