import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ElevesService} from "../../service/eleves.service";
import {NotificationService} from "../../service/notification.service";
import {NotificationType} from "../../enum/notification-type";

@Component({
  selector: 'app-details-eleve',
  templateUrl: './details-eleve.component.html',
  styleUrls: ['./details-eleve.component.css']
})
export class DetailsEleveComponent implements OnInit {

  eleve:any
  constructor(private route : ActivatedRoute,
              private eleveService : ElevesService,
              private notifier : NotificationService) { }

  ngOnInit(): void {
    this.getEleve()
  }
  public getEleve(){
    let idEleve = this.route.snapshot.params['id']
    this.eleveService.getEleve(idEleve).subscribe({
      next:(data)=>{
        this.eleve=data
      },
      error:(err)=>this.notifier.notify(NotificationType.ERROR, err.error.message)
    })
  }

  goBack() {
    window.history.back()
  }
}
