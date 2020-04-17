import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/datamodel/User';
import { Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user : User = new User()

  constructor(private userService:UserService, private router : Router) { 
    let userLocal : User = JSON.parse(localStorage.getItem("user"));
    if(userLocal != null){
      if(userLocal.type == "Admin"){
        this.router.navigate(["/adminhome"])
      }else{
        
      }
    }


  }

  ngOnInit(): void {
  }

  save(){

    if (this.user.name == null || this.user.name == ""){
      this.user.error = "Please enter name"
      return
    }

    if (this.user.email == null || this.user.email == "") {
      this.user.error = "Please enter email"
      return
    }

    if (!this.emailvalidate()){
      this.user.error = "Please enter valid email"
      return
    }

    this.user.error = null;
    this.userService.setUrl("authenticateUser")
    
    this.userService.post(this.user,(user : User) => {
      this.user = user
      if(user.error == null){
        localStorage.setItem("user",JSON.stringify(user))
        this.redirectToHome(user)
      }
    });
  }

  redirectToHome(user:User){
    if (user.type == 'Admin'){
      this.router.navigate(['/adminhome'])
    }else{
      
    }
  }

  redirect() {
    this.router.navigate(['/register'])
  }

  emailvalidate(){
    var regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regx.test(this.user.email)
  }
}