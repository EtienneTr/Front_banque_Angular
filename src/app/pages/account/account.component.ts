import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";
import { AdvisorService } from "../../services/advisor.service";
//user
import { User } from "../../models/user.model";

@Component({
  selector: 'account',
  styleUrls: ['account.component.css'],
  templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit{
  error = "";
  history: Object;
  accountid: string;
  username: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loginService: UserService,
              private advisorService: AdvisorService,
              private user: User
  ){
  }

  ngOnInit(){
    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    this.user.token = loggedUser && loggedUser.token;
    this.user.username = loggedUser && loggedUser.username;


    //si advisor qui regarde un compte client
    if(loggedUser.role && loggedUser.role == 'advisor'){
      let subUrl = this.route.queryParams.subscribe(params => {
        let userid = params['id'];
        this.advisorService.getAdvisedUser(userid, this.user.token)
          .subscribe(data => {
            this.user.accounts = data.user.accounts;
          });
      });
    }else{
      this.username = this.user.username;
      //get user
      this.loginService.getUser(this.username, this.user.token)
        .subscribe(data => {
          console.log(data);
          this.user.lastname = data.user.lastname;
          this.user.firstname = data.user.firstname;
          this.user.mail = data.user.mail;
          this.user.accounts = data.user.accounts;
        });
    }
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
