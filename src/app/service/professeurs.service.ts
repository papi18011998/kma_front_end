import { Injectable } from '@angular/core';
import {ProfesseurModelGet} from "../model/professeur-model-get";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Matiere} from "../model/matiere";
import {Professeur} from "../model/professeur";

@Injectable({
  providedIn: 'root'
})
export class ProfesseursService {
  professseurs!:ProfesseurModelGet[]
  professeur!:ProfesseurModelGet
  constructor( private httpClient:HttpClient) { }
  public getProfesseurs():Observable<ProfesseurModelGet[]>{
    this.httpClient.get<ProfesseurModelGet[]>(`${environment.apiUrl}/professeurs`).subscribe({
      next:(data)=>{
        this.professseurs=data
      }
    })
    return this.httpClient.get<ProfesseurModelGet[]>(`${environment.apiUrl}/professeurs`)
  }
  public getMateires(){
    return this.httpClient.get<Matiere[]>(`${environment.apiUrl}/matieres`)
  }
  public addProfesseur(professeur:Professeur){
    return this.httpClient.post(`${environment.apiUrl}/professeurs`,professeur)
  }

  updateProfesseur(professeur: Professeur) {
    return this.httpClient.put(`${environment.apiUrl}/professeurs/${professeur.professeurDTO.id}`,professeur)
  }

  searchProfesseur(nom: string) {
    return this.professseurs.filter((professeur:any)=>professeur.prenom.toLowerCase().includes(nom.toLowerCase()))
  }
  getMatiereOfProfesseur(id:number){
   return this.httpClient.get<ProfesseurModelGet>(`${environment.apiUrl}/professeurs/${id}`)
  }
  getManagedEleve(id:number):Observable<number>{
    return this.httpClient.get<number>(`${environment.apiUrl}/professeurs/${id}/countManagedEleves`)
  }
}
