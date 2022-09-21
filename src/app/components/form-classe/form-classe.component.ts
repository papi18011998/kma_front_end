import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClassesService} from "../../service/classes.service";
import {Classe} from "../../model/classe";
import Swal from "sweetalert2";
import {NotificationsService} from "../../service/notifications.service";

@Component({
  selector: 'app-form-classe',
  templateUrl: './form-classe.component.html',
  styleUrls: ['./form-classe.component.css']
})
export class FormClasseComponent implements OnInit {
  classInfo!:FormGroup
  constructor(public matDialogRef: MatDialogRef<FormClasseComponent>,
              private classeService:ClassesService,
              private formBuilder:FormBuilder,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.classInfo = this.formBuilder.group({
      libelle:this.formBuilder.control(null,[Validators.required,Validators.pattern('^(CI|CP|CE1|CE2|CM1|CM2|6eme|5eme|4eme|3eme|2nd|1ere|Terminale)\\w*$')])
    })
  }

  addClasse() {
    const classe:Classe ={
      id:0,
      libelle:this.classInfo.value.libelle.toUpperCase().trim()
    }
    this.classeService.addClasse(classe).subscribe({
      next:(data)=>{
        Swal.fire({
          title:'Informations après tentative d\'ajout',
          titleText:"Classe ajoutée avec succès",
          icon: 'success'
        }).then(()=>{
          this.notificationService.successOrFailOperation('','mycssSnackbarGreen','classes')
          this.matDialogRef.close()
        })
      },
      error:(err)=>{
        Swal.fire({
          title:'Informations après tentative d\'ajout',
          titleText:err.error.message,
          icon: 'error'
        })
      }
    })
  }

  get libelle(){return this.classInfo.get('libelle')}
}
