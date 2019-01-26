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
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './_services/auth.service';
import {AuthGuard} from './_guard/auth.guard';
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
import { NotFoundComponent } from './not-found/not-found.component';
import { ReslistComponent } from './reservoir/reslist/reslist.component';
import { MatListComponent } from './material/mat-list/mat-list.component';
import { MatCreateComponent } from './material/mat-create/mat-create.component';
import { MatEditComponent } from './material/mat-edit/mat-edit.component';
import {QRCodeModule} from 'angularx-qrcode';
import {NgxImageGalleryModule} from 'ngx-image-gallery';
import { ReversePipe } from './_pipes/reverse.pipe';
import { AreaListComponent } from './area/area-list/area-list.component';
import { AreaDetailComponent } from './area/area-detail/area-detail.component';
import {SortablejsModule} from 'angular-sortablejs';

// *******************************************************************************
//

@NgModule({
    declarations: [
        AppComponent,

        // Pages
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ListComponent,
        RoleslistComponent,
        RolecreateComponent,
        RoleeditComponent,
        UsercreateComponent,
        UsereditComponent,
        ProfileComponent,
        UserdocumentsComponent,
        NotFoundComponent,
        ReslistComponent,
        MatListComponent,
        MatCreateComponent,
        MatEditComponent,
        ReversePipe,
        AreaListComponent,
        AreaDetailComponent,
    ],

    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        QRCodeModule,
        NgxImageGalleryModule,
        SortablejsModule,
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