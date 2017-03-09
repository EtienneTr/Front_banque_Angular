import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

//user
import { User } from "../models/user.model";

//RXJS methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdvisorService {

  private baseUrl = 'http://localhost:3003/api/advisor/';

  constructor(private http: Http){}

  getUsers(token: string){
    let createUrl = this.baseUrl + 'customers';
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(createUrl, options).map((response: Response) => response.json());
  }

  getAdvisedUser(userid: string, token: string){
    let createUrl = this.baseUrl + 'advised/' + userid;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    return this.http.get(createUrl, options).map((response: Response) => response.json());
  }

  //admin action customer to adviser
  actionCustomerAdvisor(action: string, advisorid: string, customerid: string, token: string){
    let createUrl = 'http://localhost:3003/api/admin/' + advisorid + '/' + customerid;
    let headers    = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options    = new RequestOptions({ headers: headers });

    switch(action){
      case "add":
        return this.http.put(createUrl, null, options).map((response: Response) => response.json());
      case "remove":
        return this.http.delete(createUrl, options).map((response: Response) => response.json());
    }

  }

}
