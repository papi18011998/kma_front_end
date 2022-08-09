import {Genre} from "./genre";
import {Matiere} from "./matiere";

export interface Professeur {
  professeurDTO: {
    id: null,
    prenom: string,
    nom: string,
    userName: string,
    adresse: string,
    active: boolean,
    genre: Genre
    telephone: string,
    date_prise_fonction: Date,
    matiere: Matiere
  },
  classes: []
}
