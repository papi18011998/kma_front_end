import {Component,OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ElevesService} from "../../service/eleves.service";
import {MatDialog} from "@angular/material/dialog";
import {EvaluationFormComponent} from "../evaluation-form/evaluation-form.component";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";
import {User} from "../../model/user";

@Component({
  selector: 'app-details-eleve',
  templateUrl: './details-eleve.component.html',
  styleUrls: ['./details-eleve.component.css']
})
export class DetailsEleveComponent implements OnInit {

  eleve:any
  userConnecte:User = JSON.parse(localStorage.getItem('user')!)
  constructor(private route : ActivatedRoute,
              private eleveService : ElevesService,
              private notificationService : NotificationsService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getEleve()
  }
  public getEleve(){
    let idEleve = this.route.snapshot.params['id']
    this.eleveService.getEleve(idEleve).subscribe({
      next:(data)=>{
        this.eleve=data
        localStorage.setItem('bulletin',JSON.stringify(this.eleve))
      },
      error:(err)=>this.notificationService.successOrFailOperation(err.error.message,Constants.ERROR_STYLE,'')
    })
  }

  goBack() {
    window.history.back()
  }
  printNotes() {
    window.print()
  }

  getNoteToUpdate(id: number, notEleve:number) {
    localStorage.setItem('noteToUpdate', JSON.stringify(this.eleve))
    localStorage.setItem('idEvaluation',JSON.stringify(id))
    localStorage.setItem('noteEvaluation',JSON.stringify(notEleve))
    this.matDialog.open(EvaluationFormComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }
}
