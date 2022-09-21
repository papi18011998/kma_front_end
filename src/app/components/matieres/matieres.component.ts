import { Component, OnInit } from '@angular/core';
import {Matiere} from "../../model/matiere";
import {MatieresService} from "../../service/matieres.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {FormEleveComponent} from "../form-eleve/form-eleve.component";
import {FormMatiereComponent} from "../form-matiere/form-matiere.component";

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
  matieres!: Matiere[];
  page:number = 1
  searchForm!: FormGroup ;

  constructor(private matiereService: MatieresService,
              private formBuilder: FormBuilder,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getMatiere()
    this.searchForm = this.formBuilder.group({
      nom: this.formBuilder.control(null, Validators.required)
    })
  }

  getMatiere(){
    this.matiereService.getMatiere().subscribe({
      next:(data)=>this.matieres = data,
      error:(error)=>console.log(error.error.message)
    })
  }

  goTo(id: number) {

  }

  openMatiereModal() {
    this.matDialog.open(FormMatiereComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }

  search() {

  }
}
