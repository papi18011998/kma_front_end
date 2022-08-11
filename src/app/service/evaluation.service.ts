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
    return this.httpClient.get<number>(`${environment.apiUrl}/evaluations/mostfrequent`)
  }
  public getAverageEvaluation():Observable<number>{
    return this.httpClient.get<number>(`${environment.apiUrl}/evaluations/avg`)
  }
}
