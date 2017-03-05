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
    this.userForm = this.formBuilder.group({
      userMail: ['', Validators.required,],
      userPass: ['', Validators.required]
    });
  }

  onLoginSubmit(){
    console.log(this.userForm);
    let formValues = this.userForm.value;
    let mail = formValues.userMail;
    let pass = formValues.userPass;

    this.authService.loginUser(mail, pass)
      .subscribe(result => {
        if(result === true){
          this.router.navigate(['/home']);
        } else {
          this.error = "Mail ou mot de passe incorrecte";
        }
      });

  }
}
