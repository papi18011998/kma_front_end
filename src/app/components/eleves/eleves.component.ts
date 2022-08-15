import { Component, OnInit } from '@angular/core';
import {EleveModelGet} from "../../model/eleve-model-get";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ElevesService} from "../../service/eleves.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css']
})
export class ElevesComponent implements OnInit {
  eleves!:EleveModelGet[]
  searchForm!:FormGroup
  page:number = 1
  constructor(private eleveService:ElevesService,
              private form:FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.getEleves()
    this.searchForm = this.form.group({
      nom:this.form.control(null)
    })
  }
  public getEleves(){
    this.eleveService.getEleves().subscribe({
      next:(data)=>this.eleves=data,
      error:(err)=>console.log(err)
    })
  }

  search() {

  }

  getDetails(id: number) {
    this.router.navigate(['eleves',id])
  }
}
