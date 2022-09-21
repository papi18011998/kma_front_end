import { Component, OnInit } from '@angular/core';
import {EleveModelGet} from "../../model/eleve-model-get";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ElevesService} from "../../service/eleves.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import Swal from "sweetalert2";
import {AdminsService} from "../../service/admins.service";
import {MatDialog} from "@angular/material/dialog";
import {FormEleveComponent} from "../form-eleve/form-eleve.component";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css']
})
export class ElevesComponent implements OnInit {
  eleves!:EleveModelGet[]
  searchForm!:FormGroup
  user:User = this.getConnectedUser()
  page:number = 1
  constructor(private eleveService:ElevesService,
              private form:FormBuilder,
              private router: Router,
              private adminService : AdminsService,
              private notificationService: NotificationsService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getEleves()
    this.searchForm = this.form.group({
      nom:this.form.control(null)
    })
  }
  public getEleves(){
    if(this.user.role == 'ROLE_PARENT'){
      let idParent = this.user.id
      this.eleveService.getElevesByParent(idParent).subscribe({
        next:(data)=>{
          this.eleves = data._embedded.eleves
        }
      })
    }else{
      this.eleveService.getEleves().subscribe({
        next:(data)=>this.eleves=data,
        error:(err)=>console.log(err)
      })
    }
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
    this.eleves = this.eleveService.searchEleve(this.searchForm.value.nom)
  }

  getDetails(id: number) {
    this.router.navigate(['eleves',id])
  }
  getConnectedUser():User{
    return JSON.parse(localStorage.getItem('user')!)
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
            this.notificationService.successOrFailOperation(Constants.PROFIL_MODIFIE,Constants.SUCCESS_STYLE,'eleves')
          },
          error:(err)=>this.notificationService.successOrFailOperation(err.error.message,Constants.ERROR_STYLE,'eleves')
        })
      }
    })
  }

  openEleveModal() {
    this.openDialog()
  }
  openDialog(){
    this.matDialog.open(FormEleveComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }
}
