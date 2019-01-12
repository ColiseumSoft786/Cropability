import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import {LayoutBlankComponent} from './layout/layout-blank/layout-blank.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_guard/auth.guard';
import {ListComponent} from './users/list/list.component';
import {RoleslistComponent} from './users/roles/roleslist/roleslist.component';
import {RolecreateComponent} from './users/roles/rolecreate/rolecreate.component';
import {RoleeditComponent} from './users/roles/roleedit/roleedit.component';
import {UsercreateComponent} from './users/usercreate/usercreate.component';
import {UsereditComponent} from './users/useredit/useredit.component';
import {ProfileComponent} from './user/profile/profile.component';
import {UserdocumentsComponent} from './users/userdocuments/userdocuments.component';
import {RoleGuard} from './_guard/role.guard';
import {NotFoundComponent} from './not-found/not-found.component';

// *******************************************************************************
// Routes

const routes: Routes = [
    { path: '', component: Layout1Component, pathMatch: 'full', canActivateChild: [AuthGuard], children: [
            { path: '', component: HomeComponent },
        ]},
    { path: 'users', component: Layout1Component, canActivateChild: [AuthGuard], children: [
            { path: '', component: ListComponent, canActivate: [RoleGuard], data: {role: 'users', perm: 'read'}},
            { path: 'create', component: UsercreateComponent, canActivate: [RoleGuard], data: {role: 'users', perm: 'create'}},
            { path: 'edit/:id', component: UsereditComponent, canActivate: [RoleGuard], data: {role: 'users', perm: 'update'}},
            { path: 'documents/:id', component: UserdocumentsComponent, canActivate: [RoleGuard], data: {role: 'documents', perm: 'read'}},
        ]},
    { path: 'roles', component: Layout1Component, canActivateChild: [AuthGuard] , children: [
            { path: '', component: RoleslistComponent, canActivate: [RoleGuard], data: {role: 'roles', perm: 'read'}},
            { path: 'create', component: RolecreateComponent , canActivate: [RoleGuard], data: {role: 'roles', perm: 'create'}},
            { path: 'edit/:id', component: RoleeditComponent , canActivate: [RoleGuard], data: {role: 'roles', perm: 'update'}},
        ]},
    { path: 'profile', component: Layout1Component, canActivateChild: [AuthGuard] , children: [
            { path: '', component: ProfileComponent},
        ]},
    { path: '', component: LayoutBlankComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            {path: '404', component: NotFoundComponent},
        ]},
    {path: '**', redirectTo: '/404'}
];

// *******************************************************************************
//

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}