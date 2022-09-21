import { Component, OnInit } from '@angular/core';
import {ProfesseursService} from "../../service/professeurs.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {AdminsService} from "../../service/admins.service";
import {MatDialog} from "@angular/material/dialog";
import {FormProfesseurComponent} from "../form-professeur/form-professeur.component";
import {ProfesseurModelGet} from "../../model/professeur-model-get";
import {NotificationsService} from "../../service/notifications.service";

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.css']
})
export class ProfesseursComponent implements OnInit {
  constructor(private professeurService:ProfesseursService,
              private router:Router,
              private form:FormBuilder,
              private adminService : AdminsService,
              private matDialog: MatDialog,
              private notificationService: NotificationsService) { }
  professeurs!: ProfesseurModelGet[]
  page:number =1
  searchForm!:FormGroup
  ngOnInit(): void {
    this.getProfesseurs()
    this.searchForm =this.form.group({
      nom:this.form.control(null)
    })

  }
  getProfesseurs(){
    this.professeurService.getProfesseurs().subscribe({
      next:(data)=>{
        this.professeurs=data
      }
    })
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
            this.notificationService.successOrFailOperation('Profil modifié avec succès !!!','mycssSnackbarGreen','professeurs')
          },
          error:(err)=>this.notificationService.successOrFailOperation(err.error.message,'mycssSnackbarRed','professeurs')
        })
      }
    })
  }

  goTo(id:number) {
    let founded = this.professeurs.find((professeur:any)=>professeur.id==id)
    localStorage.setItem('professeur',JSON.stringify(founded).toString())
    this.openDialog()
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
    this.professeurs = this.professeurService.searchProfesseur(this.searchForm.value.nom.toLowerCase())
  }

  openProfesseurModal() {
    if(localStorage.getItem('professeur')){
      localStorage.removeItem('professeur')
    }
    this.openDialog()
  }
  openDialog(){
    this.matDialog.open(FormProfesseurComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }
}
