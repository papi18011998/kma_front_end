import {Component, OnInit} from '@angular/core';
import {ParentModelGet} from "../../model/parent-model-get";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ParentService} from "../../service/parent.service";
import Swal from "sweetalert2";
import {NotificationType} from "../../enum/notification-type";
import {AdminsService} from "../../service/admins.service";
import {MatDialog} from "@angular/material/dialog";
import {FormParentComponent} from "../form-parent/form-parent.component";
import {NotificationsService} from "../../service/notifications.service";


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
               private notificationService: NotificationsService,
               private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getParents()
    this.searchForm = this.form.group({
      indice:this.form.control(null)
    })
  }
  public getParents(){
    this.parentService.getParents().subscribe({
      next:(data)=>{this.parents=data}
    })
  }

  search() {
    if (this.searchForm.value.indice == null || this.searchForm.value.indice.trim() =='')
      return
    this.parents = this.parentService.searchParent(this.searchForm.value.indice)
  }

  changeStatus(id: number) {
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
            this.notificationService.successOrFailOperation('Profil modifié avec succès !!!','mycssSnackbarGreen','parents')
            this.getParents()
          },
          error:(err)=>this.notificationService.successOrFailOperation(err.error.message,'mycssSnackbarRed','parents')
        })
      }
    })
  }

  openParentModal() {
    this.matDialog.open(FormParentComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }
}
