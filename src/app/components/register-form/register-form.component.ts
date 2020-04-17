import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/datamodel/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  contactMethods = [
    { id: 1, label: "Select user type" },
    { id: 2, label: "Admin" },
    { id: 3, label: "User" }
  ]

  selectedOption : number = 1

  user : User = new User()

  constructor(private userService:UserService, private router : Router) { }

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

    if(this.selectedOption == 1){
      this.user.error = "Please select user type"
      return
    }

    this.user.type = this.contactMethods[this.selectedOption-1].label

    this.user.error = null;
    this.userService.setUrl("createUser")
    this.userService.post(this.user,(user : User) => {
      this.user = user
      if (user.error == null) {
        localStorage.setItem("user",JSON.stringify(user))
        this.redirectToHome(user)
      }
    });
  }

  emailvalidate(){
    var regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regx.test(this.user.email)
  }

  redirectToLogin(){
    this.router.navigate(['/'])
  }

  redirectToHome(user:User){
    if (user.type == 'Admin'){
      this.router.navigate(['/adminhome'])
    }else{

    }
  }
}