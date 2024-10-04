import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppService } from '../../core/service/app.service';
import { IState } from '../../model/IState';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../model/IUser';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [ButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './adduser.component.html',
})
export class AddUserComponent implements OnInit {
  states!: IState[];
  userForm!: FormGroup;
  userId!: any;

  constructor(private fb: FormBuilder,private router: Router, private appService: AppService, private route: ActivatedRoute){}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.userId){
      this.getUserDetails();
    }
    this.initiateUserForm();
    this.appService.getStates().subscribe(data => this.states = data);
  }
  
  initiateUserForm(){
    this.userForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      City: ['', [Validators.required]],
      State: ['', [Validators.required]],
      PinCode: ['', [Validators.required]]
    });
  }

  getUserDetails(){
    this.appService.getUser(this.userId).subscribe(data => {
      this.userForm.patchValue({
        FirstName: data.FirstName,
        LastName: data.LastName,
        City: data.City,
        State: data.State,
        PinCode: data.PinCode
      })
    });
  }

  // saveUser(){
  //   if(this.userForm.valid){
  //     const user: IUser = this.userForm.value;
  //     const userInfo = JSON.stringify(user);
  //     if(this.userId){
  //       this.appService.updateUser(userInfo, this.userId).subscribe(data => {
  //         console.log(data);  
  //       });
  //     }else{
  //       this.appService.saveUser(userInfo).subscribe(data => {
  //         console.log(data);  
  //       });
  //     }
      
  //     this.router.navigate(['/manageUsers']);
  //   }else{
  //     this.userForm.markAllAsTouched();
  //   }
  // }

  submit(){
    if(this.userForm.valid){
      const user: IUser = this.userForm.value;
      const userInfo = JSON.stringify(user);
      if(this.userId){
        this.updateUser(userInfo);
      }else{
        this.saveUser(userInfo); 
      }
      this.router.navigate(['/manageUsers']);
    }else{
      this.userForm.markAllAsTouched();
    }
  }

  saveUser(userInfo: any){
    this.appService.saveUser(userInfo).subscribe(data => {
      console.log(data);  
    });
  }

  updateUser(userInfo: any){
    this.appService.updateUser(userInfo, this.userId).subscribe(data => {
      console.log(data);  
    });
  }

  cancel(){
    this.router.navigate(['/manageUsers']);
  }
}
