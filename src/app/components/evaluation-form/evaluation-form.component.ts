import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EleveModelGet} from "../../model/eleve-model-get";
import {ProfesseursService} from "../../service/professeurs.service";
import {EvaluationService} from "../../service/evaluation.service";
import {NotificationService} from "../../service/notification.service";
import {Evaluation} from "../../model/evaluation";
import {NotificationType} from "../../enum/notification-type";
@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm!: FormGroup;
  eleveToEvaluate: EleveModelGet = JSON.parse(localStorage.getItem('eleveToEvaluate')!)
  constructor(private formBuilder:FormBuilder,
              private professeurService: ProfesseursService,
              private evaluationService : EvaluationService,
              private notifier: NotificationService) { }

  ngOnInit(): void {
    this.evaluationForm = this.formBuilder.group({
      idEleve : this.formBuilder.control(this.eleveToEvaluate.id,Validators.required),
      prenom : this.formBuilder.control(this.eleveToEvaluate.prenom,Validators.required),
      nom: this.formBuilder.control(this.eleveToEvaluate.nom,Validators.required),
      matricule: this.formBuilder.control(this.eleveToEvaluate.matricule,Validators.required),
      matiere : this.formBuilder.control(null,Validators.required),
      date_naissance : this.formBuilder.control(this.eleveToEvaluate.date_naissance,Validators.required),
      note: this.formBuilder.control(null,Validators.required)
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

  get prenom(){return this.evaluationForm.get('prenom')}
  get nom(){return this.evaluationForm.get('nom')}
  get matricule(){return this.evaluationForm.get('matricule')}
  get matiere(){return this.evaluationForm.get('matiere')}
  get date_naissance(){return this.evaluationForm.get('date_naissance')}
  get note(){return this.evaluationForm.get('note')}

  submitEvaluation() {
    let idProfesseur = JSON.parse(localStorage.getItem('user')!).id
    const evaluation:Evaluation = {
      idEleve: this.evaluationForm.value.idEleve,
      idProfesseur: idProfesseur,
      note:this.evaluationForm.value.note
    }
    this.evaluationService.addEvaluation(evaluation).subscribe({
      next:(data)=>{
        this.notifier.notify(NotificationType.SUCCESS, "Nouvelle note ajoutée !!!")
        //back to previous page
        window.history.back()

      },
      error:(err)=>this.notifier.notify(NotificationType.ERROR, err.error.message)
    })
  }
}
