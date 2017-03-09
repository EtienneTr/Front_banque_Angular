import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";
import { AdvisorService } from "../../services/advisor.service";
//user
import { User } from "../../models/user.model";

@Component({
  selector: 'advisor',
  styleUrls: ['advisor.component.css'],
  templateUrl: 'advisor.component.html'
})
export class AdvisorComponent {
  profileForm: FormGroup;
  error = "";
  succesMsg = "";
  history: Object;
  accountid: string;
  users = null;

  constructor(
              private router: Router,
              private advisorService: AdvisorService,
              private advisor: User
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    advisor.token = loggedUser && loggedUser.token;
    advisor.username = loggedUser && loggedUser.username;

    //get user
    this.advisorService.getUsers(advisor.token)
      .subscribe(data => {
        this.users = data.advised;
      });
  }

  onClickShowAccount(userid: string){
    this.router.navigate(['/account'], {queryParams: {id: userid}});

  }

}
