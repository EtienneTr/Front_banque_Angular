"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
//RXJS methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3003/api/';
    }
    UserService.prototype.create = function (user) {
        var createUrl = this.baseUrl + 'user/register';
        var bodyString = JSON.stringify({ lastname: user.lastname, firstname: user.firstname, username: user.username, mail: user.mail, password: user.password });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(createUrl, bodyString, options).map(function (response) { return response.json(); });
    };
    UserService.prototype.getUser = function (user) {
        var createUrl = this.baseUrl + 'user/' + user.username;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-access-token': user.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(createUrl, options).map(function (response) { return response.json(); });
    };
    UserService.prototype.updateUser = function (user) {
        var createUrl = this.baseUrl + 'user/' + user.username;
        var bodyString = JSON.stringify({ lastname: user.lastname, firstname: user.firstname, username: user.username, mail: user.mail });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-access-token': user.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(createUrl, bodyString, options).map(function (response) { return response.json(); });
    };
    UserService.prototype.getAccountDetails = function (account, token) {
        var createUrl = this.baseUrl + 'account/' + account;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(createUrl, options).map(function (response) { return response.json(); });
    };
    UserService.prototype.getAccounts = function (token) {
        var createUrl = this.baseUrl + 'account/all';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(createUrl, options).map(function (response) { return response.json(); });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
