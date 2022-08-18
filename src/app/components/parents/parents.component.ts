import {Component, OnInit} from '@angular/core';
import {ParentModelGet} from "../../model/parent-model-get";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ParentService} from "../../service/parent.service";
import Swal from "sweetalert2";
import {NotificationType} from "../../enum/notification-type";
import {AdminsService} from "../../service/admins.service";
import {NotificationService} from "../../service/notification.service";


@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  parents!: ParentModelGet[]
  page:number = 1;
  searchForm!:FormGroup
  constructor( private parentService:ParentService,
               private form:FormBuilder,
               private adminService : AdminsService,
               private notifier : NotificationService) { }

  ngOnInit(): void {
    this.getParents()
    this.searchForm = this.form.group({
      nom:this.form.control(null)
    })
  }
  public getParents(){
    this.parentService.getParents().subscribe({
      next:(data)=>{this.parents=data}
    })
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
  }

  changeStaus(id: number) {
    Swal.fire({
      title: 'Voulez vous vraiment changer le status',
      text: "Cette opération est réversible !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#218838',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.changeStatus(id).subscribe({
          next:()=> {
            this.getParents()
            this.notifier.notify(NotificationType.SUCCESS,"Profil modifié avec succès !!!" )
          },
          error:(err)=>this.notifier.notify(NotificationType.ERROR, err.error.message)
        })
      }
    })
  }
}
