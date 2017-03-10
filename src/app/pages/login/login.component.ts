import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  //authService: AuthService;
  userForm: FormGroup;
  error = "";

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService
  ){ }

  ngOnInit(){

    //logout
    this.authService.logout();

    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required,],
      userPass: ['', Validators.required]
    });
  }

  onLoginSubmit(){
    let formValues = this.userForm.value;
    let mail = formValues.userName;
    let pass = formValues.userPass;

    this.authService.loginUser(mail, pass)
      .subscribe(result => {
        if(result === true){
          this.router.navigate(['/']);
        } else {
          this.error = "Mail ou mot de passe incorrecte";
        }},
        error => {
          this.error = "Mail ou mot de passe incorrecte";
        });

  }
}
