import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

//service pour login
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  apiService: ApiService;

  constructor(public formBuilder: FormBuilder){

  }

  ngOnInit(){
    /*this.userForm = new FormGroup({
      userMail: new FormControl(),
      userPass: new FormControl()
    });*/
    this.userForm = this.formBuilder.group({
      userMail: ['', Validators.required,],
      userPass: ['', Validators.required]
    });

  }

  onLoginSubmit(){
    console.log(this.userForm);

    let userObj = {
      mail: this.userForm.controls.userMail.value;
    }

    this.apiService.loginUser(userObj);
  }
}
