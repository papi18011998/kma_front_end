import {Genre} from "./genre";

export interface EleveModelGet {
  id:number
  prenom:string
  nom:string
  login:string
  adresse:string
  is_active:boolean
  genre:Genre
  telephone:string
  matricule:string
  date_naissance:string
}
