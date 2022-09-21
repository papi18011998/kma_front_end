import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Matiere} from "../model/matiere";

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(private httpClient: HttpClient) { }
  public getMatiere():Observable<Matiere[]>{
    return this.httpClient.get<Matiere[]>(`${environment.apiUrl}/matieres`)
  }

  addMatiere(matiere: Matiere):Observable<Matiere> {
    return this.httpClient.post<Matiere>(`${environment.apiUrl}/matieres`,matiere)
  }
}
