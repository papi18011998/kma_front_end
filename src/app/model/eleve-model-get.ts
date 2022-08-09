import {Genre} from "./genre";

export interface EleveModelGet {
  id:number
  prenom:string
  nom:string
  userName:string
  adresse:string
  active:boolean
  genre:Genre
  telephone:string
  matricule:string
  date_naissance:string
}
