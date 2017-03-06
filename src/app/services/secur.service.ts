import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class SecurService implements CanActivate {

  constructor(private route: Router) {}

  canActivate(){
    if(localStorage.getItem("loggeduser")){
      return true;
    }

    this.route.navigate(['login']);
    return false;
  }

}
