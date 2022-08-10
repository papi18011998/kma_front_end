import {Component, OnInit} from '@angular/core';
import {EleveModelGet} from "../../model/eleve-model-get";
import {ClassesService} from "../../service/classes.service";
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {NotificationType} from "../../enum/notification-type";

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
              private notifier : NotificationService) { }

  ngOnInit(): void {
    this.getElevesPerClasse()
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
}
