import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  public login(user:User):Observable<HttpResponse<any> | HttpErrorResponse >{
      return this.http.post<HttpResponse<any> | HttpErrorResponse>("http://localhost:8080/users/login",user,{observe:'response'});
  }
}
