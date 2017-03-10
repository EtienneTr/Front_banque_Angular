import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";
import { AdvisorService } from "../../services/advisor.service";
//user
import { User } from "../../models/user.model";

@Component({
  selector: 'admin',
  styleUrls: ['admin.component.css'],
  templateUrl: 'admin.component.html'
})
export class AdminComponent {
  error = "";
  success = "";
  history: Object;
  advisors = null;
  customers = null;
  users = null;
  notAssign = null;
  currentAdv : string;

  constructor(
    private router: Router,
    private advisorService: AdvisorService,
    private userService: UserService,
    private admin: User
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));

    admin.token = loggedUser && loggedUser.token;
    admin.username = loggedUser && loggedUser.username;
    console.log(admin);
    //get user
    this.userService.getAll(admin.token)
      .subscribe(data => {
        this.advisors = data.advisors;
        this.customers = data.customers;
      });
  }

  onClickShowCustomers(adviseId){
    this.currentAdv = adviseId;
    this.users = this.advisors.find(e => e._id == adviseId).advised;
    var usersArray = this.users;
    console.log(this.users);
    this.notAssign = this.customers.filter(function(e){
      for (let i=0;i<usersArray.length; i++){
        if(usersArray[i]._id == e._id ){
          return false;
        }
      }
      return true;
    });
  }

  onCLickAction(action: string, userid: string){
    this.advisorService.actionCustomerAdvisor(action, this.currentAdv, userid, this.admin.token)
      .subscribe(result => {
        if(result && result.status === 200){
          this.success = "L'action a bien été effectué";
          //refresh customers
          console.log(result);
          if(action === "add"){
            this.notAssign = this.notAssign.filter(e => e._id != userid);
            this.users = result.advisor.advised;
          } else {
            let user = this.users.filter(e => e._id == userid);
            console.log(user);
            this.users = result.advisor.advised;
            this.notAssign.push(user[0]);
          }
        }
      },
      error => {
        this.error = "Action impossible";
      })
  }


}
