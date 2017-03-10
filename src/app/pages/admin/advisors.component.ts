import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";
import { AdvisorService } from "../../services/advisor.service";
//user
import { User } from "../../models/user.model";

@Component({
  selector: 'advisors',
  templateUrl: 'advisors.component.html'
})
export class AdvisorsComponent {
  error = "";
  success = "";
  history: Object;
  advisors = null;
  customers = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private admin: User
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    admin.token = loggedUser && loggedUser.token;
    admin.username = loggedUser && loggedUser.username;

    //get user
    this.userService.getAll(admin.token)
      .subscribe(data => {
        this.advisors = data.advisors;
        this.customers = data.customers;
      });
  }

  onClickAction(userid){
    this.userService.upgradeToAdvisor(userid, this.admin.token)
      .subscribe(result => {
        if(result && result.status === 200){
          this.success = "L'action a bien été effectué";
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      },
      error =>{
        this.error = "Impossible d'effectuer cette action";
      })
  }


}
