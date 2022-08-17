import {Matiere} from "./matiere";

export interface EvaluationModelGet {
  id: number
  note: number
  date_evaluation: string
  matiere: Matiere
}
