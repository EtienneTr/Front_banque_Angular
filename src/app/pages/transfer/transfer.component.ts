import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour user
import { UserService } from "../../services/user.service";

import { User } from "../../models/user.model";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'transfer',
  styleUrls: ['transfer.component.css'],
  templateUrl: 'transfer.component.html'
})
export class TransferComponent implements OnInit {

  //authService: AuthService;
  transfertForm: FormGroup;
  error = "";
  accounts: Object;

  radio1=true;
  radio2=false;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private user: User
  ){
    //get user
    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    user.token = loggedUser && loggedUser.token;
    user.username = loggedUser && loggedUser.username;

    //get user
    this.userService.getUser(user)
      .subscribe(data => {
        this.user.lastname = data.user.lastname;
        this.user.firstname = data.user.firstname;
        this.user.mail = data.user.mail;
        this.user.accounts = data.user.accounts;
      });

    //get accounts
    this.userService.getAccounts(user.token)
      .subscribe( data => {
        this.accounts = data.accounts.filter(function (e){
          for (let i=0;i<user.accounts.length; i++){
            let acc = user.accounts[i];
            if(acc._id == e.accountId ){
              return false;
            }
          }
          return true;
        });
        }
      )

  }

  ngOnInit(){

    this.transfertForm = this.formBuilder.group({
      accountFrom: ['', Validators.required],
      accountTo: ['', Validators.required]
    });
  }

  onRadioClick(nbr: number){
    switch(nbr){
      case 1:
        this.radio1 = true;
        this.radio2 = false;
        break;
      case 2:
        this.radio1 = false;
        this.radio2 = true;
    }
  }

  onLoginSubmit(){
    console.log(this.transfertForm);
    let formValues = this.transfertForm.value;
    /*let mail = formValues.userName;
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
        });*/

  }
}
