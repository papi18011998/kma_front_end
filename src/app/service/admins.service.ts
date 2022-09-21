import { Injectable } from '@angular/core';
import {Admin} from "../model/admin";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Genre} from "../model/genre";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  admins!:Admin[]
  constructor(private httpClient: HttpClient) {
  }
  public getAdmins():Observable<Admin[]>{

    this.httpClient.get<Admin[]>(`${environment.apiUrl}/administrateurs`).subscribe({
      next:(data)=>this.admins=data
    })
    return this.httpClient.get<Admin[]>(`${environment.apiUrl}/administrateurs`)
  }
  public searchAdmin(nom:string){
    return this.admins.filter((admin:Admin)=>admin.prenom.toLowerCase().includes(nom.toLowerCase()))
  }
  public getGenres():Observable<Genre[]>{
    return this.httpClient.get<Genre[]>(`${environment.apiUrl}/genres`)
  }
  public findByLogin(login:string){
    return this.httpClient.get(`${environment.apiUrl}/users/username/${login}`)
  }
  public findByTelephone(telephone:string){
    return this.httpClient.get(`${environment.apiUrl}/users/telephone/${telephone}`)
  }

  public addAdmin(admin:Admin){
    return this.httpClient.post(`${environment.apiUrl}/administrateurs`,admin)
  }
  public changeStatus(id:number){
    return this.httpClient.put(`${environment.apiUrl}/users/status/${id}`,{})
  }
  public updateAdmin(admin:Admin){
    return this.httpClient.put(`${environment.apiUrl}/users/${admin.id}`,admin)
  }
}
