import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

//RXJS methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private baseUrl = 'http://localhost:3003/api/';
  public token: string;
  public isLogged = false;

  //observable connection ( pour afficher le menu qd utilisateur connecté)
  private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: Observable<boolean> = this._isLogged.asObservable();

  //observable rôle utilisateur pour changer le menu
  private _role: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public showSpecificRole: Observable<string> = this._role.asObservable();

  constructor(private http: Http)
  {
    if(localStorage.getItem("loggeduser")){
      this.isLogged = true;
      this._isLogged.next(this.isLogged);
      this._role.next(JSON.parse(localStorage.getItem("loggeduser")).role);
    }
  }

  loginUser(username: string, password: string): Observable<boolean> {

    let loginUrl = this.baseUrl + "user/login";
    let bodyString = JSON.stringify({username: username, password: password}); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers });

    return this.http.post(loginUrl, bodyString, options)
      .map((res:Response) => {
        let token = res.json() && res.json().token;
        if(token){
          this.token = token;
          //store current user infos
          localStorage.setItem('loggeduser', JSON.stringify({username: username, token: token, role: res.json().role }));
          this.isLogged = true;
          this._isLogged.next(this.isLogged);
          this._role.next(res.json().role);
          return true;
        } else {
          return false;
        }
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  logout(){
    this.token = null;
    this.isLogged = false;
    this._isLogged.next(this.isLogged);
    this._role.next('');
    localStorage.removeItem("loggeduser");
  }

}
