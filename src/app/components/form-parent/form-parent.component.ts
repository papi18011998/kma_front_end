import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Genre} from "../../model/genre";
import {Classe} from "../../model/classe";
import {AdminsService} from "../../service/admins.service";
import {ClassesService} from "../../service/classes.service";
import {Router} from "@angular/router";
import {ParentService} from "../../service/parent.service";
import {Parent} from "../../model/parent";
import {NotificationService} from "../../service/notification.service";
import {NotificationType} from "../../enum/notification-type";


@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css']
})
export class FormParentComponent implements OnInit {

  genres!:Genre[]
  classes!:Classe[]
  formParent!: FormGroup
  formEleve!:FormGroup
  constructor (private adminService:AdminsService,
               private classeService:ClassesService,
               private form:FormBuilder,
               private router:Router,
               private parentService:ParentService,
               private notifier: NotificationService) {}

  ngOnInit(): void {
    this.getGenres()
    this.getClasses()
    this.formParent = this.form.group({
      prenom: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      nom: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      adresse: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      telephone: this.form.control(null,[Validators.required,Validators.pattern('^(77|78|76|70|75)[0-9]{7}$')]),
      cni: this.form.control(null,[Validators.required,Validators.pattern('^(1|2)[0-9]{12}$')]),
      login: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      genre_id: this.form.control(null,[Validators.required]),
    })
    this.formEleve = this.form.group({
      prenomEleve: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      nomEleve: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      adresseEleve: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      genre_idEleve: this.form.control(null,[Validators.required]),
      date_naissance: this.form.control(null,[Validators.required]),
      annee: this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)])
    })
  }
  public getGenres(){
    this.adminService.getGenres().subscribe({
      next:(data)=>this.genres=data,
      error:(error)=>console.log(error)
    })
  }
  public getClasses(){
    this.classeService.getClasses().subscribe({
      next:(data)=> this.classes=data,
      error:(error)=>console.log(error)
    })
  }
  get prenom(){return this.formParent.get('prenom')}
  get nom(){return this.formParent.get('nom')}
  get adresse(){return this.formParent.get('adresse')}
  get telephone(){return this.formParent.get('telephone')}
  get cni(){return this.formParent.get('cni')}
  get login(){return this.formParent.get('login')}
  get genre_id(){return this.formParent.get('genre_id')}
  get prenomEleve(){return this.formParent.get('prenomEleve')}
  get nomEleve(){return this.formParent.get('nomEleve')}
  get adresseEleve(){return this.formParent.get('adresseEleve')}
  get genre_idEleve(){return this.formParent.get('genre_idEleve')}
  get date_naissance(){return this.formParent.get('date_naissance')}
  get annee(){return this.formParent.get('annee')}
  public onSubmit(){
    const parent:Parent={
      prenom: this.formParent.value.prenom,
      nom: this.formParent.value.nom,
      adresse: this.formParent.value.adresse,
      telephone: this.formParent.value.telephone,
      cni: this.formParent.value.cni,
      userName: this.formParent.value.login,
      genre_id: this.formParent.value.genre_id,
      prenomEleve: this.formEleve.value.prenomEleve,
      nomEleve: this.formEleve.value.nomEleve,
      adresseEleve: this.formEleve.value.adresseEleve,
      genre_idEleve: this.formEleve.value.genre_idEleve,
      date_naissance: this.formEleve.value.date_naissance,
      annee: this.formEleve.value.annee
    }
    this.parentService.addParent(parent).subscribe({
      next:()=>{
        this.router.navigate(['parents'])
        this.notifier.notify(NotificationType.SUCCESS, "Parent et élève ajouté avec succès !!!")
      },
      error:error => {
        this.notifier.notify(NotificationType.ERROR, error.error.message)
        console.log(error)
      }
    })
  }

}
