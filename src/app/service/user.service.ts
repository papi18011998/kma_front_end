import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from "@angular/common/http";
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
  public resetPassword(email:string):Observable<any| HttpErrorResponse> {
    return this.http.get(`${environment}/users/resetpassword/${email}`);
  }
  public updateProfileImage(formData: FormData):Observable<HttpEvent<User>| HttpErrorResponse> {
    return this.http.post<User>(`${environment}/users/updateProfileImage`,formData,{reportProgress:true, observe:"events"});
  }
  public deleteUser(userId:number):Observable<any| HttpErrorResponse> {
    return this.http.delete<any>(`${environment}/users/delete/${userId}`);
  }
  public addUsersToLocalCache(users:User[]):void {
    localStorage.setItem('users',JSON.stringify(users))
  }
  public getUsersFromLocalCache():User[]|null {
    if(localStorage.getItem('users')){
      //@ts-ignore
      return JSON.parse(localStorage.getItem('users'))
    }
    return null;
  }
  public createUserFormDate(loggedInUsername:string,user:User,profileImage:File):FormData {
    const formData = new FormData()
    formData.append('currentUsername',loggedInUsername)
    formData.append('firstName',user.firstName)
    formData.append('lastName',user.lastName)
    formData.append('email',user.email)
    formData.append('userName',user.userName)
    formData.append('role',user.role)
    formData.append('profileImage',profileImage)
    formData.append('isActive',JSON.stringify(user.isActive))
    formData.append('isNotLocked',JSON.stringify(user.isNotLocked))
    formData.append('isNotLocked',JSON.stringify(user.isNotLocked))
    return formData
    }
}
