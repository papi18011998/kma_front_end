import { Injectable } from '@angular/core';
import {EleveModelGet} from "../model/eleve-model-get";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Eleve} from "../model/eleve";

@Injectable({
  providedIn: 'root'
})
export class ElevesService {
  eleves!: EleveModelGet[]|any
  constructor(private httpClient: HttpClient) { }
  public getEleves():Observable<EleveModelGet[]>{
    this.httpClient.get<EleveModelGet[]>(`${environment.apiUrl}/eleves`).subscribe({
      next:(data)=>this.eleves=data
    })
    return this.httpClient.get<EleveModelGet[]>(`${environment.apiUrl}/eleves`)
  }
  public getElevesByParent(id:number):Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/parents/${id}/eleves`)
  }

  addEleve(eleve: Eleve) {
    return this.httpClient.post<Eleve>(`${environment.apiUrl}/eleves`, eleve)
  }
  getCountEleves():Observable<number>{
    return this.httpClient.get<number>(`${environment.apiUrl}/eleves/count`)
  }

  getEleve(idEleve: number):Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/eleves/${idEleve}`)
  }
}
