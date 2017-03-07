import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//RXJS methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:3003/api/';

  constructor(private http: Http){}

  create(lastname: string, firstname: string, username: string, mail: string, password: string) {
    let createUrl = this.baseUrl + 'register';
    let bodyString = JSON.stringify({lastname: lastname, firstname: firstname, username: username, mail: mail, password: password});
    let headers    = new Headers({ 'Content-Type': 'application/json' });
    let options    = new RequestOptions({ headers: headers });

    return this.http.post(createUrl, bodyString, options).map((response: Response) => response.json());
  }

  getUser(username: string, token: string){
    let createUrl = this.baseUrl + 'user/' + username;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(createUrl, options).map((response: Response) => response.json());
  }

  updateUser(lastname: string, firstname: string, username: string, mail: string, token: string){
    let createUrl = this.baseUrl + 'user/' + username;
    let bodyString = JSON.stringify({lastname: lastname, firstname: firstname, username: username, mail: mail});
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.put(createUrl, bodyString, options).map((response: Response) => response.json());
  }

}
