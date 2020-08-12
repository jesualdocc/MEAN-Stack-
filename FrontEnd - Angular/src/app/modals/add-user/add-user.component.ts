import { userName } from './../../login/login.component';
import { Component, OnInit } from '@angular/core';
import { Users } from 'app/users/Users';
import { MatDialogRef } from '@angular/material';
import { UsersService } from 'app/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  userRoles = ["Admin", "Regular"];
  model = new Users();
  submitted = false;
  submissionMessage = '';
  emailList:string[] = [];
  usernameList:string[] = [];
  errorMessage = false;
  
  get checkUsername():string { 
    const uName = this.model.userName;
    if(this.usernameList.includes(uName)){
      const ret = 'Username:' + uName + ' is not available';
      return ret;
    }
    
    return '';
   }


  constructor(public dialogRef: MatDialogRef<AddUserComponent>, private userService:UsersService, private router: Router,) { }

  ngOnInit(): void {
    this.getAll();
  }

  onSubmit(){
    
    this.sendData();
    
  }


  getAll(){
    this.userService.getAllUsers().subscribe(data=>{
     
      for(var values of data){
        this.emailList.push(values['email']);
        this.usernameList.push(values['userName']);
      }

    });}

  sendData(){
    this.userService.addUser(this.model).subscribe(result=>{
    if(result.ok == 1){
      this.errorMessage = false;
      this.submitted = true;
      this.submissionMessage = '';
      alert("User Added");
      this.dialogRef.close();
      this.router.navigate(['/dashboard']);
    }
    else{
      
      this.errorMessage = true;
      if(this.emailList.includes(this.model.email)){
        this.submissionMessage = "Email is already Registered";
      }
      else{
        this.submissionMessage = "An error occurred!Try Again..."
      }
      
    }
    });
  }

  clearForm(){
    this.model = new Users();
  }

}

