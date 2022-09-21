import {Component, OnInit} from '@angular/core';
import {EleveModelGet} from "../../model/eleve-model-get";
import {ClassesService} from "../../service/classes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EvaluationFormComponent} from "../evaluation-form/evaluation-form.component";
import {Constants} from "../../enum/constants";
import {NotificationsService} from "../../service/notifications.service";

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
              private notificationService: NotificationsService,
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
      error:(error)=>{this.notificationService.successOrFailOperation(error.error.message,Constants.ERROR_STYLE,'')}
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
