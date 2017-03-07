import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

//service pour login
import { UserService } from "../../services/user.service";

@Component({
  selector: 'profile',
  styleUrls: ['profile.component.css'],
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  error = "";
  succesMsg = "";
  //edit bool
  editing = false;
  buttonEdit = "";

  //user
  username = "";
  token = "";
  lastname = "";
  firstname = "";
  mail = "";

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private loginService: UserService
  ){

    var loggedUser = JSON.parse(localStorage.getItem("loggeduser"));
    this.token = loggedUser && loggedUser.token;
    this.username = loggedUser && loggedUser.username;
    this.buttonEdit = "Éditer le profil";

    //get user
    this.loginService.getUser(this.username, this.token)
      .subscribe(data => {
        var user = data && data.user;
        this.lastname = user.lastname;
        this.firstname = user.firstname;
        this.mail = user.mail;
      });
  }

  ngOnInit(){

    this.profileForm = this.formBuilder.group({
      lastname: [this.lastname, Validators.required],
      firstname: [this.firstname, Validators.required],
      username: [this.username, Validators.required],
      mail: [this.mail, Validators.required]
    });
  }

  onUpdateSubmit(){
    console.log(this.profileForm);
    let formValues = this.profileForm.value;

    let lastname = formValues.lastname || this.lastname;
    let firstname = formValues.firstname || this.lastname;
    let username = formValues.username || this.username;
    let mail = formValues.mail || this.mail;

    this.loginService.updateUser(lastname, firstname, username, mail, this.token)
      .subscribe(data => {
          //no edit status
          console.log(data);
          this.editing = false;
          this.buttonEdit = "Éditer le profil";
          this.succesMsg = "Modification effectuée avec succès";
          //update values
          this.lastname = data.user.lastname;
          this.firstname = data.user.firstname;
          this.username = data.user.username;
          this.mail = data.user.mail;
        },
        error => {
          this.error = "Modification impossible.";
        });

  }

  onClickEdit(){
    if(this.editing === false){
      this.editing = true;
      this. buttonEdit = "Annuler l'édition";
    } else {
      this.editing = false;
      this.buttonEdit = "Éditer le profil";
    }
  }

}
