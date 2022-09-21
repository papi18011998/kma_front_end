import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EleveModelGet} from "../../model/eleve-model-get";
import {ProfesseursService} from "../../service/professeurs.service";
import {EvaluationService} from "../../service/evaluation.service";
import {NotificationService} from "../../service/notification.service";
import {Evaluation} from "../../model/evaluation";
import {NotificationType} from "../../enum/notification-type";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationsService} from "../../service/notifications.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm!: FormGroup;
  eleveToEvaluate: EleveModelGet = JSON.parse(localStorage.getItem('eleveToEvaluate')!)

  noteEleveToUpdate: EleveModelGet = JSON.parse(localStorage.getItem('noteToUpdate')!)
  idEvaluation:number = JSON.parse(localStorage.getItem('idEvaluation')!)
  noteEleve: number = JSON.parse(localStorage.getItem('noteEvaluation')!)
  is_update: boolean = false;

  constructor(private formBuilder:FormBuilder,
              private professeurService: ProfesseursService,
              private evaluationService : EvaluationService,
              private notifier: NotificationService,
              public matDialogRef: MatDialogRef<EvaluationFormComponent>,
              private notificationService: NotificationsService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.noteEleveToUpdate != null && this.idEvaluation != null && this.noteEleve != null){
      this.is_update = true
    }
    this.evaluationForm = this.formBuilder.group({
      idEleve : this.formBuilder.control((this.is_update)?this.noteEleveToUpdate.id:this.eleveToEvaluate.id,Validators.required),
      prenom : this.formBuilder.control((this.is_update)?this.noteEleveToUpdate.prenom:this.eleveToEvaluate.prenom,Validators.required),
      nom: this.formBuilder.control((this.is_update)?this.noteEleveToUpdate.nom:this.eleveToEvaluate.nom,Validators.required),
      matricule: this.formBuilder.control((this.is_update)?this.noteEleveToUpdate.matricule:this.eleveToEvaluate.matricule,Validators.required),
      matiere : this.formBuilder.control(null,Validators.required),
      date_naissance : this.formBuilder.control((this.is_update)?this.noteEleveToUpdate.date_naissance:this.eleveToEvaluate.date_naissance,Validators.required),
      note: this.formBuilder.control((this.is_update)?this.noteEleve:null,Validators.required)
    })
    this.getMatiereOfProfesseur()
  }
  getMatiereOfProfesseur() {
    let idProfesseur = JSON.parse(localStorage.getItem('user')!).id
    this.professeurService.getMatiereOfProfesseur(idProfesseur).subscribe({
      next:(data)=> {
        this.evaluationForm.patchValue({
          matiere:data.matiere.libelle
        })
      }
    })
  }

  submitEvaluation() {
    let idProfesseur = JSON.parse(localStorage.getItem('user')!).id
    const evaluation:Evaluation = {
      idEleve: this.evaluationForm.value.idEleve,
      idProfesseur: idProfesseur,
      note:this.evaluationForm.value.note
    }
    // En cas de modification
    if(this.is_update){
      //modfication de note
        this.evaluationService.updateEvaluation(this.idEvaluation,evaluation).subscribe({
          next:(data)=>{
            this.notificationService.successOrFailOperation('Note modifiée avec succès !!!','mycssSnackbarGreen',`eleves/${evaluation.idEleve}`)
            // fermeture du modal
            this.matDialogRef.close()
            // suppression du localStorage de modification
            localStorage.removeItem('noteToUpdate')
            localStorage.removeItem('idEvaluation')
            localStorage.removeItem('noteEvaluation')
          },
          error:(error)=>{
                this.snackBar.open(error.error.message, 'OK', {
                  verticalPosition: 'bottom',
                  duration: 4000,
                  panelClass: ['mycssSnackbarRed']
                });
          }
        })
    }else{
      //Ajout de note
      this.evaluationService.addEvaluation(evaluation).subscribe({
        next:()=>{
          this.notificationService.successOrFailOperation('Note ajoutée avec succès !!!','mycssSnackbarGreen',`eleves/${evaluation.idEleve}`)
          // delete eleveToEvaluate from localStorage
          localStorage.removeItem('eleveToEvaluate')
          //close modal
          this.matDialogRef.close()

        },
        error:(err)=> {
          this.snackBar.open(err.error.message, 'OK', {
            verticalPosition: 'bottom',
            duration: 4000,
            panelClass: ['mycssSnackbarRed']
          });
        }
      })
    }
  }

  get nom(){return this.evaluationForm.get('nom')}
  get matricule(){return this.evaluationForm.get('matricule')}
  get prenom(){return this.evaluationForm.get('prenom')}
  get matiere(){return this.evaluationForm.get('matiere')}
  get date_naissance(){return this.evaluationForm.get('date_naissance')}
  get note(){return this.evaluationForm.get('note')}
}
