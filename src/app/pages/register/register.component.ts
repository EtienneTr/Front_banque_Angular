import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";

//user
import { User } from "../../models/user.model";

@Component({
  selector: 'register',
  styleUrls: ['register.component.css'],
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = "";

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private registerService: UserService
  ){ }

  ngOnInit(){

    this.registerForm = this.formBuilder.group({
      lastname: ['', Validators.required,],
      firstname: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegisterSubmit(){
    let formValues = this.registerForm.value;

    let user = new User();
    user.lastname = formValues.lastname;
    user.firstname = formValues.firstname;
    user.username = formValues.username;
    user.mail = formValues.mail;
    user.password = formValues.password;

    this.registerService.create(user)
      .subscribe(data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = "Enregistrement impossible."
        });

  }



}
