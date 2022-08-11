import {Component, OnInit} from '@angular/core';
import {ClassesService} from "../../service/classes.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Classe} from "../../model/classe";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {NotificationType} from "../../enum/notification-type";

@Component({
  selector: 'app-classes-per-professeur',
  templateUrl: './classes-per-professeur.component.html',
  styleUrls: ['./classes-per-professeur.component.css']
})
export class ClassesPerProfesseurComponent implements OnInit {

  constructor(private classeService:ClassesService,
              private formBuilder:FormBuilder,
              private router: Router,
              private notifier : NotificationService) { }

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
    let idProfesseur:number = JSON.parse(localStorage.getItem('user')!).id
    this.classeService.getClassesOfProfesseur(idProfesseur).subscribe({
      next:(data)=>{
        this.classes=data
      },
      error:(error)=>this.notifier.notify(NotificationType.ERROR, error.error.message)
    })
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
    this.classes = this.classeService.searchClasses(this.searchForm.value.nom.toLowerCase())
  }

  getElevesPerClasse(id:number) {
    this.router.navigate(['classes',id,'2021-2022'])
  }
}
