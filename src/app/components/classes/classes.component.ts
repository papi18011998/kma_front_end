import { Component, OnInit } from '@angular/core';
import {ClassesService} from "../../service/classes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../../model/classe";
import Swal from "sweetalert2";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  constructor(private classeService:ClassesService, private formBuilder:FormBuilder) { }

  classes!:Classe[]
  page: string | number=1;
  searchForm!:FormGroup
  classInfo!:FormGroup

  ngOnInit(): void {
    this.getClasses()
    this.searchForm=this.formBuilder.group({
      nom: this.formBuilder.control(null)
    })
    this.classInfo = this.formBuilder.group({
      libelle:this.formBuilder.control(null,[Validators.required,Validators.pattern('^(CI|CP|CE1|CE2|CM1|CM2|6eme|5eme|4eme|3eme|2nd|1ere|Terminale)\\w*$')])
    })

  }
  public getClasses(){
    this.classeService.getClasses().subscribe({
      next:(data)=>{
        this.classes=data
      }
    })
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
    this.classes = this.classeService.searchClasses(this.searchForm.value.nom.toLowerCase())
  }
  get libelle(){return this.classInfo.get('libelle')}

  addClasse() {
    const classe:Classe ={
      id:0,
      libelle:this.classInfo.value.libelle.toUpperCase().trim()
    }
    this.classeService.addClasse(classe).subscribe({
      next:(data)=>{
        Swal.fire({
          title:'Iformations après tentative d\'ajout',
          titleText:"Classe ajoutée avec succès",
          icon: 'success'
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
}
