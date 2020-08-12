import { baseUrl, baseUrlAngular } from './../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

export var userName:string;
export var userRole:string;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formGroup:FormGroup | undefined;
  
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(){
    this.formGroup = new FormGroup({
      userName: new FormControl("", [Validators.required, Validators.minLength(5)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  loginProcess(){
    if(this.formGroup?.valid){
      this.loginService.loginHandler(this.formGroup.value).subscribe(result=>{
        
        if(result.isValid){
          userName= result.userName;
          userRole = result.role;
          
          const token = result.token;
          
          this.router.navigate(['/dashboard']);
          
        }
        else{
          console.log("No Sucess"); 
        }
      });
    }
  }
}
