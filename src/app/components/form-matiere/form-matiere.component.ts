import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {MatieresService} from "../../service/matieres.service";
import {Matiere} from "../../model/matiere";
import Swal from "sweetalert2";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";

@Component({
  selector: 'app-form-matiere',
  templateUrl: './form-matiere.component.html',
  styleUrls: ['./form-matiere.component.css']
})
export class FormMatiereComponent implements OnInit {
  is_update:boolean = false
  addMatiereForm!: FormGroup
  coefficientNaN!:string
  existingLogin: boolean = false
  constructor(public matDialogRef:MatDialogRef<FormMatiereComponent>,
              private formBuilder: FormBuilder,
              private matiereService: MatieresService,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.addMatiereForm = this.formBuilder.group({
      libelle: this.formBuilder.control(null,[Validators.required]),
      coefficient: this.formBuilder.control(null,[Validators.required])
    })
  }
  get libelle(){ return this.addMatiereForm.get('libelle')}
  get coefficient(){ return this.addMatiereForm.get('coefficient')}

  addMatiere() {
    if(this.is_update){
      // Modification
    }else{
      //Ajout
      if(isNaN(this.addMatiereForm.value.coefficient)){
        this.coefficientNaN = 'Format de saisie incorrect: Nombre requis !!!'
      }else{
        const matiere: Matiere ={
          id: 0,
          libelle: this.addMatiereForm.value.libelle.trim(),
          coefficient: this.addMatiereForm.value.coefficient
        }
        this.matiereService.addMatiere(matiere).subscribe({
          next:(data)=> {
            Swal.fire({
              title:'Informations après tentative d\'ajout',
              titleText:"Matière ajoutée avec succès",
              icon: 'success'
            }).then(()=>{
              this.notificationService.successOrFailOperation('',Constants.SUCCESS_STYLE,'classes')
              this.matDialogRef.close()
            })
          },
          error:(error)=> {
            Swal.fire({
              title:'Informations après tentative d\'ajout',
              titleText:error.error.message,
              icon: 'error'
            })
          }
        })
      }

    }
  }
}
