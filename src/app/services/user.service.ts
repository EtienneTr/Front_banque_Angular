import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//user
import { User } from "../models/user.model";

//RXJS methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:3003/api/';

  constructor(private http: Http){}

  create(user: User) {
    let createUrl = this.baseUrl + 'user/register';
    let bodyString = JSON.stringify({lastname: user.lastname, firstname: user.firstname, username: user.username, mail: user.mail, password: user.password});
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

  updateUser(user: User){
    let createUrl = this.baseUrl + 'user/' + user.username;
    let bodyString = JSON.stringify({lastname: user.lastname, firstname: user.firstname, username: user.username, mail: user.mail});
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': user.token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.put(createUrl, bodyString, options).map((response: Response) => response.json());
  }


  //ACCOUNTS
  getAccountDetails(account: string, token: string){
    let createUrl = this.baseUrl + 'account/' + account;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(createUrl, options).map((response: Response) => response.json());
  }

  getAccounts(token: string){
    let createUrl = this.baseUrl + 'account/all';
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(createUrl, options).map((response: Response) => response.json());
  }

  transferAccounts(fromAccount: string, toAccount: string, amount: number, token: string){
    let transfertUrl = this.baseUrl + 'account/transfer/' + fromAccount + '/' + toAccount;
    let bodyString = JSON.stringify({amount: amount});
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.post(transfertUrl, bodyString, options).map((response: Response) => response.json());
  }

  getAll(token: string){
    let getUrl = this.baseUrl + 'admin/all';
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(getUrl, options).map((response: Response) => response.json());
  }

}
