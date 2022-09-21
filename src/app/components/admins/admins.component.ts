import { Component, OnInit } from '@angular/core';
import {Admin} from "../../model/admin";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminsService} from "../../service/admins.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {MatDialog} from "@angular/material/dialog";
import {FormAdminComponent} from "../form-admin/form-admin.component";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins!:Admin[]
  page: number = 1;
  searchForm!:FormGroup
  constructor(private adminsService:AdminsService,
              private formBuilder:FormBuilder,
              private router:Router,
              private matDialog: MatDialog,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      nom: this.formBuilder.control(null)
    })
    this.getAdmins()
  }
  public getAdmins(){
    this.adminsService.getAdmins().subscribe({
      next:(data)=>{this.admins=data},
      error:(error)=>{console.log(error)}
    })
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
    this.admins = this.adminsService.searchAdmin(this.searchForm.value.nom.toLowerCase())
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
        this.adminsService.changeStatus(id).subscribe({
          next:()=> {
            this.notificationService.successOrFailOperation(Constants.PROFIL_MODIFIE,Constants.SUCCESS_STYLE,'admins')
          },
          error:(err)=>this.notificationService.successOrFailOperation(err.error.message,Constants.ERROR_STYLE,'admins')
        })
      }
    })
  }

  goTo(id:number) {
    let founded = this.admins.find(admin => admin.id == id)
    localStorage.setItem('admin',JSON.stringify(founded).toString())
    this.openDialog()
  }

  openAdminModal() {
    if (JSON.parse(localStorage.getItem('admin')!)) {
      localStorage.removeItem('admin')
    }
    this.openDialog()
  }
  openDialog(){
    this.matDialog.open(FormAdminComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }
}
