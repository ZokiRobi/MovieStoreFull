import { environment } from './../../environments/environment.prod';
import { User } from "./../Models/User";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";
import { tokenNotExpired, JwtHelper, AuthHttp } from "angular2-jwt";

@Injectable()
export class AuthService {
  userToken: any;
  decodedToken;
  private userLoggedIn = new BehaviorSubject<boolean>(this.checkLoggedIn());
  userLogged = this.userLoggedIn.asObservable();
  private isAdmin = new BehaviorSubject<boolean>(this.checkUserRole());
  isAdminObservable = this.isAdmin.asObservable();
  jwtHelper: JwtHelper = new JwtHelper();
  url = environment.apiUrl;

  constructor(private http: Http, private Auth: AuthHttp) {}

  getName() {
    let token = this.jwtHelper.decodeToken(localStorage.getItem("token"));
    return token.unique_name;
  }

  getId() {
   let user: any = localStorage.getItem('user');
   user = JSON.parse(user);
   return user.id;
  }

  login(model: any) {
    return this.http
      .post(this.url + "auth/login", model, this.setHeaders())
      .map((response: Response) => {
        const user = response.json();
        if (user) {
          localStorage.setItem("token", user.tokenString);
          localStorage.setItem('user',JSON.stringify(user.user));
          this.userToken = user.tokenString;
          this.decodedToken = this.jwtHelper.decodeToken(this.userToken);
          localStorage.setItem("userRole", this.decodedToken.role);
        }
      })
      .catch(this.handleError);
  }

  checkLoggedIn() {
    var token = localStorage.getItem("token");
    return !!token;
  }

  checkUserRole() {
    const userToken = localStorage.getItem("userRole");
    if (userToken === "admin") {
      return true;
    }

    return false;
  }

  userHasLoggedIn(loggedIn) {
    this.userLoggedIn.next(loggedIn);
    this.isAdmin.next(this.checkUserRole());
  }

  register(model: any) {
    return this.http
      .post(this.url + "auth/register", model, this.setHeaders())
      .catch(this.handleError);
  }

  private setHeaders() {
    const headers = new Headers({ "Content-Type": "application/json" });
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: any) {
    const applicationEror = error.headers.get("Application-Error");
    if (applicationEror) {
      return Observable.throw(applicationEror);
    }

    const serverError = error.json();
    let modelStateErrors = "";
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + "\n";
        }
      }
    }
    return Observable.throw(modelStateErrors || "Server error");
  }
}
