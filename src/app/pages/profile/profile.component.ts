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
  //edit bool
  editing = false;
  buttonEdit = ""

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
        console.log(data);
        var user = data && data.user && data.user[0];
        this.lastname = user.lastname;
        this.firstname = user.firstname;
        this.mail = user.mail;
      });
  }

  ngOnInit(){

    this.profileForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', Validators.required]
    });
  }

  onUpdateSubmit(){
    console.log(this.profileForm);
    let formValues = this.profileForm.value;
    /*
    this.registerService.create(formValues.lastname, formValues.firstname, formValues.username, formValues.mail, formValues.password)
      .subscribe(data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = "Enregistrement impossible."
        });*/

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
