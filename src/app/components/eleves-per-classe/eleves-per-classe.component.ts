import {Component, OnInit} from '@angular/core';
import {EleveModelGet} from "../../model/eleve-model-get";
import {ClassesService} from "../../service/classes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {NotificationType} from "../../enum/notification-type";
import {FormMatiereComponent} from "../form-matiere/form-matiere.component";
import {MatDialog} from "@angular/material/dialog";
import {EvaluationFormComponent} from "../evaluation-form/evaluation-form.component";

@Component({
  selector: 'app-eleves-per-classe',
  templateUrl: './eleves-per-classe.component.html',
  styleUrls: ['./eleves-per-classe.component.css']
})
export class ElevesPerClasseComponent implements OnInit {
  eleves!: EleveModelGet[]
  searchForm!:FormGroup
  page:number = 1
  constructor(private classeService : ClassesService,
              private route : ActivatedRoute,
              private notifier : NotificationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getElevesPerClasse()
    this.searchForm = this.formBuilder.group({
      nom : this.formBuilder.control(null)
    })
  }
  public getElevesPerClasse(){
    let idClasse:number = this.route.snapshot.params['id']
    this.classeService.getElevesOfClasse(idClasse).subscribe({
      next:(data)=>{this.eleves = data},
      error:(error)=>{this.notifier.notify(NotificationType.ERROR, error.error.message)}
    })
  }
  search() {

  }

  getEleveToEvaluate(id: number) {
    // suppression du localStorage de modification
    localStorage.removeItem('noteToUpdate')
    localStorage.removeItem('idEvaluation')
    localStorage.removeItem('noteEvaluation')

    let eleveToEvaluate = this.eleves.find((eleve)=> eleve.id==id)
    localStorage.setItem('eleveToEvaluate',JSON.stringify(eleveToEvaluate))
    this.matDialog.open(EvaluationFormComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }

  getDetailsEleve(id: number) {
    this.router.navigate(['eleves/'+id])
  }
}
