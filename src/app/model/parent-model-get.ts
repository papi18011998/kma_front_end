import {Genre} from "./genre";

export interface ParentModelGet {
  id:number
  prenom:string
  nom:string
  userName:string
  adresse:string
  is_active:boolean
  genre:Genre
  telephone:string
  cni:string
}
