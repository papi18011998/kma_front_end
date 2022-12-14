import { Injectable } from '@angular/core';
import {Evaluation} from "../model/evaluation";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpClient:HttpClient) { }
  public addEvaluation(evaluation:Evaluation):Observable<any>{
    return this.httpClient.post<any>(`${environment.apiUrl}/evaluations`,evaluation)
  }
  public getMostFrequentEvaluation():Observable<number>{
    let userRole:string= JSON.parse(localStorage.getItem('user')!).role
    let userId:number= JSON.parse(localStorage.getItem('user')!).id
    if (userRole == 'ROLE_ADMIN'){
      return this.httpClient.get<number>(`${environment.apiUrl}/evaluations/mostfrequent`)
    }else {
      return this.httpClient.get<number>(`${environment.apiUrl}/parents/${userId}/eleves/maxscore`)
    }
  }
  public getAverageEvaluation():Observable<number>{
    return this.httpClient.get<number>(`${environment.apiUrl}/evaluations/avg`)
  }
  public getToFiveScore():Observable<string[]>{
    return this.httpClient.get<string[]>(`${environment.apiUrl}/eleves/top`)
  }
  public  updateEvaluation(idEvaluation:number,evaluation: Evaluation):Observable<Evaluation>{
    return this.httpClient.put<Evaluation>(`${environment.apiUrl}/evaluations/${idEvaluation}`,evaluation)
  }
}
