import {Component,OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ElevesService} from "../../service/eleves.service";
import {NotificationService} from "../../service/notification.service";
import {NotificationType} from "../../enum/notification-type";
import {MatDialog} from "@angular/material/dialog";
import {EvaluationFormComponent} from "../evaluation-form/evaluation-form.component";

@Component({
  selector: 'app-details-eleve',
  templateUrl: './details-eleve.component.html',
  styleUrls: ['./details-eleve.component.css']
})
export class DetailsEleveComponent implements OnInit {

  eleve:any
  constructor(private route : ActivatedRoute,
              private eleveService : ElevesService,
              private notifier : NotificationService,
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
      error:(err)=>this.notifier.notify(NotificationType.ERROR, err.error.message)
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
