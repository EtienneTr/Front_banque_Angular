import {Component} from '@angular/core';

//service pour login
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  logged: boolean;
  role: number;

  constructor(private authService: AuthService){
    this.authService.showNavBarEmitter.subscribe((mode)=>{
      // mode will be null the first time it is created, so you need to ignore it when null
      if (mode !== null) {
        this.logged = mode;
      }
    });

    this.authService.showSpecificRole.subscribe((role) => {
      if(role != null){
        switch (role) {
          case "advisor":
            this.role = 1;
            break;
          case "admin":
            this.role = 2;
            break;
          default:
            this.role = 0;
            break;
        }
      }
    });

  }
}
