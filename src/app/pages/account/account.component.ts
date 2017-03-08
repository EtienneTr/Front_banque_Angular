import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";
//user
import { User } from "../../models/user.model";

@Component({
  selector: 'account',
  styleUrls: ['account.component.css'],
  templateUrl: 'account.component.html'
})
export class AccountComponent {
  profileForm: FormGroup;
  error = "";
  succesMsg = "";
  history: Object;
  accountid: string;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private loginService: UserService,
              private user: User
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    user.token = loggedUser && loggedUser.token;
    user.username = loggedUser && loggedUser.username;

    //get user
    this.loginService.getUser(user)
      .subscribe(data => {
        this.user.lastname = data.user.lastname;
        this.user.firstname = data.user.firstname;
        this.user.mail = data.user.mail;
        this.user.accounts = data.user.accounts;
        console.log(data.user);
        console.log(this.user);
      });
  }

  onClickAccount(accountid: string){
    //this.router.navigate(['details'], {queryParams: {token: this.user.token, account: accountid}});
    this.loginService.getAccountDetails(accountid, this.user.token)
      .subscribe(data =>{
          this.history = data.account.history;
          this.accountid = accountid;
          console.log(this.history);
        },
        error => {
          this.error = "Impossible de récupérer l'historique du compte.";
        })
  }

  onClickHistoryClose(){
    this.history = null;
  }

}
