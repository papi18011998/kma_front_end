import { Component, OnInit } from '@angular/core';
import {ClassesService} from "../../service/classes.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Classe} from "../../model/classe";

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

}
