import { Injectable } from '@angular/core';
import {ParentModelGet} from "../model/parent-model-get";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Parent} from "../model/parent";
import {Matiere} from "../model/matiere";
import {Evaluation} from "../model/evaluation";
import {EvaluationModelGet} from "../model/evaluation-model-get";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  parents!:ParentModelGet[]
  constructor(private httpClient:HttpClient) { }
  public getParents():Observable<ParentModelGet[]>{
    this.httpClient.get<ParentModelGet[]>(`${environment.apiUrl}/parents`).subscribe({
      next:(data)=>{
        this.parents=data
      }
    })
    return this.httpClient.get<ParentModelGet[]>(`${environment.apiUrl}/parents`)
  }

  searchParent(nom: string) {
  }
  public addParent(parent:Parent){
    return this.httpClient.post(`${environment.apiUrl}/parents`,parent)
  }
  public finByCni(cni:string){
    return this.httpClient.get<ParentModelGet>(`${environment.apiUrl}/parents/cni/${cni}`)
  }
  getCountElevesByParent(id: number):Observable<number>{
    return this.httpClient.get<number>(`${environment.apiUrl}/parents/${id}/counteleves`)
  }
  getStatsEleve(idParent:number,idEleve:number):Observable<EvaluationModelGet[]>{
    return this.httpClient.get<EvaluationModelGet[]>(`${environment.apiUrl}/parents/${idParent}/eleves/${idEleve}/evaluations`)
  }


}
