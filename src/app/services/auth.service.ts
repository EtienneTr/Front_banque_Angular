import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//RXJS methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private baseUrl = 'http://localhost:3003/api/';
  public token: string;

  constructor(private http: Http){}

  loginUser(username: string, password: string): Observable<boolean> {

    let loginUrl = this.baseUrl + "login";
    let bodyString = JSON.stringify({username: username, password: password}); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers });

    return this.http.post(loginUrl, bodyString, options)
      .map((res:Response) => {
        console.log(res.json());
        let token = res.json() && res.json().token;
        if(token){
          this.token = token;
          //store current user infos
          localStorage.setItem('loggeduser', JSON.stringify({username: username, token: token }));

          return true;
        } else {
          return false;
        }
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  logout(){
    this.token = null;
    localStorage.removeItem("loggeduser");
  }

}
