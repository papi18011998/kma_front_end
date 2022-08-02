// @ts-ignore

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {}

  intercept(req: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(`${environment.apiUrl}/users/login`)){
      return httpHandler.handle(req)
    }
    if (req.url.includes(`${environment.apiUrl}/users/register`)){
      return httpHandler.handle(req)
    }
    if (req.url.includes(`${environment.apiUrl}/users/resetpassword`)){
      return httpHandler.handle(req)
    }
    this.authenticationService.loadToken()
    const token = this.authenticationService.getToken()
    const request = req.clone({setHeaders:{authentication:`Bearer ${token}`}})
    return  httpHandler.handle(req)
}
