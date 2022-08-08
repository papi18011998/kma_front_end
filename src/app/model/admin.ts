import {Genre} from "./genre";

export interface Admin {
  id: any
  prenom: string
  nom: string,
  login: string
  adresse: string
  is_active: boolean
  genre : Genre
  telephone: string
}
