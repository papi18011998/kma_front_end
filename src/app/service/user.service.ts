import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  jwtHelper = new JwtHelperService()
  constructor(private http:HttpClient) { }
  public getUsers():Observable<User[]| HttpErrorResponse> {
    return this.http.get<User[]>(`${environment}/users/list`);
  }
  public addUser(formData: FormData):Observable<User| HttpErrorResponse> {
    return this.http.post<User>(`${environment}/users/add`,formData);
  }

  public updateUser(formData: FormData):Observable<User| HttpErrorResponse> {
    return this.http.post<User>(`${environment}/users/update`,formData);
  }
}
