import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";

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
    console.log(this.registerForm);
    let formValues = this.registerForm.value;

    this.registerService.create(formValues.lastname, formValues.firstname, formValues.username, formValues.mail, formValues.password)
      .subscribe(data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = "Enregistrement impossible."
        });

  }



}
