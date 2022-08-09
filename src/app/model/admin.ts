import {Genre} from "./genre";

export interface Admin {
  id: any
  prenom: string
  nom: string,
  userName: string
  adresse: string
  active: boolean
  genre : Genre
  telephone: string
}
