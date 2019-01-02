import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import {LayoutBlankComponent} from './layout/layout-blank/layout-blank.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './Guard/auth.guard';
import {ListComponent} from './users/list/list.component';
import {RoleslistComponent} from './users/roles/roleslist/roleslist.component';
import {RolecreateComponent} from './users/roles/rolecreate/rolecreate.component';
import {RoleeditComponent} from './users/roles/roleedit/roleedit.component';
import {UsercreateComponent} from './users/usercreate/usercreate.component';
import {UsereditComponent} from './users/useredit/useredit.component';

// *******************************************************************************
// Routes

const routes: Routes = [
    { path: '', component: Layout1Component, pathMatch: 'full', canActivateChild: [AuthGuard], children: [
            { path: '', component: HomeComponent },
        ]},
    { path: 'users', component: Layout1Component, canActivateChild: [AuthGuard] , children: [
            { path: '', component: ListComponent},
            { path: 'create', component: UsercreateComponent},
            { path: 'edit/:id', component: UsereditComponent},
        ]},
    { path: 'roles', component: Layout1Component, canActivateChild: [AuthGuard] , children: [
            { path: '', component: RoleslistComponent},
            { path: 'create', component: RolecreateComponent },
            { path: 'edit/:id', component: RoleeditComponent },
        ]},

    { path: '', component: LayoutBlankComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]}
];

// *******************************************************************************
//

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}