import { Component, OnInit } from '@angular/core';
import {ClassesService} from "../../service/classes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../../model/classe";
import Swal from "sweetalert2";
import {FormEleveComponent} from "../form-eleve/form-eleve.component";
import {MatDialog} from "@angular/material/dialog";
import {FormClasseComponent} from "../form-classe/form-classe.component";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  constructor(private classeService:ClassesService,
              private formBuilder:FormBuilder,
              private matDialog: MatDialog) { }

  classes!:Classe[]
  page: string | number=1;
  searchForm!:FormGroup

  ngOnInit(): void {
    this.getClasses()
    this.searchForm=this.formBuilder.group({
      nom: this.formBuilder.control(null)
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

  openClasseModal() {
    this.matDialog.open(FormClasseComponent,{
      width: '100',
      height: '100',
      panelClass: 'event-form-dialog',
      disableClose: true
    })
  }
}
