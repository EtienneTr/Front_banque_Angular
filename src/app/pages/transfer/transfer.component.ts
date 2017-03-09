import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour user
import { UserService } from "../../services/user.service";

import { User } from "../../models/user.model";

@Component({
  selector: 'transfer',
  styleUrls: ['transfer.component.css'],
  templateUrl: 'transfer.component.html'
})
export class TransferComponent implements OnInit {

  //authService: AuthService;
  transfertForm: FormGroup;
  error = "";
  success = "";
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
    this.userService.getUser(user.username, user.token)
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
      fromAccount: ['0', Validators.required],
      isAccount: ['in', Validators.required],
      inAccount: ['0', Validators.required],
      outAccount: ['0', Validators.required],
      amount: ['', Validators.required]
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

  onTransferSubmit(){
    let formValues = this.transfertForm.value;

    let fromAccount = formValues.fromAccount;
    let isAccount = formValues.isAccount;
    let toAccount = "";
    if(isAccount === "in"){
      toAccount = formValues.inAccount;
    }
    if(isAccount === "out"){
      toAccount = formValues.outAccount;
    }
    let amount = formValues.amount;

    if(fromAccount !== toAccount){

      this.userService.transferAccounts(fromAccount, toAccount, amount, this.user.token)
        .subscribe(result =>{
          if(result && result.status === 200){
            this.success = "Virement effectué avec succès !";
          }
        },
        error => {
          this.error = "Le virement n'a pas pu s'effectuer. Veuilelz vérifier vos informations.";
        });

    } else {
      this.error = "Impossible d'effectuer un virement sur le même compte";
    }


  }
}
