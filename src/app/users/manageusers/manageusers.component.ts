import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AppService } from '../../core/service/app.service';
import { IUser } from '../../model/IUser';
import { Router } from '@angular/router';

@Component({
    selector: 'manageusers.component',
    templateUrl: './manageusers.component.html',
    standalone: true,
    imports: [TableModule, HttpClientModule, InputTextModule, TagModule, IconFieldModule, InputIconModule, ButtonModule],
    providers: [AppService]
})
export class ManageUsersComponent implements OnInit{
    users!: IUser[];
   
    selectedUser!: IUser;
    userIdToDelete!: string;

    constructor(private appService: AppService, private router: Router) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers(){
        this.appService.getUsers().subscribe((data) => (this.users = data));
    }

    addUser(){
        this.router.navigate(['/addUser']);
    }
    openDeleteModal(userId: string){
        this.userIdToDelete = userId;
    }

    deleteUser(){
        this.appService.deleteUser(this.userIdToDelete).subscribe(data => {
            this.getUsers();
        })
    }

    editUser(userId: string){
        this.router.navigate(['/editUser', userId]);
    }
}