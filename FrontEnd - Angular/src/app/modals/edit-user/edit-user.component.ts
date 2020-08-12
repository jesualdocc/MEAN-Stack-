import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from 'app/users/users.service';
import { Users } from 'app/users/Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  model = new Users();
  rowID:string = '';
  userRoles = ["Admin", "Regular"];
  submitted = false;
  submissionMessage = '';
  emailList:string[] = [];
  usernameList:string[] = [];
  errorMessage = false;
  currentEmail = '';
  currentUsername = '';
  
  get checkUsername():string { 
    const uName = this.model.userName;
    if(this.usernameList.includes(uName) && (uName != this.currentUsername)){
      const ret = 'Username:' + uName + ' is not available';
      return ret;
    }
    
    return '';
   }


  constructor(private userService:UsersService, public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) data:any, private router: Router) {
      this.rowID = data['id'];
     }

  ngOnInit(): void {
    this.getAll();
    this.getUser();    
  }

  onSubmit(){
    
    this.sendData();
    
  }

  getUser(){
    this.userService.getbyId(this.rowID).subscribe(data=>{
      
      this.currentEmail = data['email'];
      this.currentUsername = data['userName'];

      this.model.firstName = data['firstName'];
      this.model.lastName = data['lastName'];
      this.model.userName = data['userName'];
      this.model.email = data['email'];
      this.model.phoneNumber = data['phoneNumber'];
      this.model.role = data['role'];
    });
  }

  getAll(){
    this.userService.getAllUsers().subscribe(data=>{
     
      for(var values of data){
        this.emailList.push(values['email']);
        this.usernameList.push(values['userName']);
      }

    });}

  sendData(){
    this.userService.updateUser(this.rowID, this.model).subscribe(result=>{
      if(result.ok == 1){
        this.errorMessage = false;
        this.submitted = true;
        this.submissionMessage = '';
        alert("User Updated");
        this.dialogRef.close();
        this.router.navigate(['/dashboard']);
      }
      else{
        
        this.errorMessage = true;
        if(this.emailList.includes(this.model.email) && (this.currentEmail != this.model.email)){
          this.submissionMessage = "Email is already Registered";
        }
        else{
          this.submissionMessage = "An error occurred!Try Again...";
        }
      }
   });
  }

}
