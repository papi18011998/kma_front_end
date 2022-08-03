import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token!: string|null;
  private loggedInUsername!: null|string ;
  private jwtHelper= new JwtHelperService();
  public host = environment.apiUrl

  constructor(private http:HttpClient) { }
  public login(user:User):Observable<HttpResponse<any> | HttpErrorResponse >{
      return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${environment}/users/login`,user,{observe:'response'});
  }
  public register(user:User):Observable<User | HttpErrorResponse >{
    return this.http.post<User | HttpErrorResponse>(`${environment}/users/register`,user,);
  }
  public logout():void{
    this.token=null;
    this.loggedInUsername=null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token:string):void{
    this.token=token;
    localStorage.setItem('token',token);
  }

  public addUserToLocalCache(user:User):void{
    localStorage.setItem('user',JSON.stringify(user));
  }
  public getUserFromLocalCache():User{
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user'));
  }
  public loadToken():void{
    // @ts-ignore
    this.token = JSON.parse(localStorage.getItem('token'));
  }
  public getToken():string{
    // @ts-ignore
    return this.token;
  }

  public isUserLoggedIn():boolean|any {
    this.loadToken()
    if(this.token!=null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if (!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub
          return true
        }
      }
    }else{
      this.logout()
      return false
    }
  }
}
