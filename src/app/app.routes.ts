import { Routes } from '@angular/router';
import { ManageUsersComponent } from './users/manageusers/manageusers.component';
import { AddUserComponent } from './users/adduser/adduser.component';

export const routes: Routes = [
    { path: '', component: ManageUsersComponent },
    { path: 'manageUsers', component: ManageUsersComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'editUser/:id', component: AddUserComponent }
];
