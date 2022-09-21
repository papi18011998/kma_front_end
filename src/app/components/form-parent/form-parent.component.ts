import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Genre} from "../../model/genre";
import {Classe} from "../../model/classe";
import {AdminsService} from "../../service/admins.service";
import {ClassesService} from "../../service/classes.service";
import {ParentService} from "../../service/parent.service";
import {Parent} from "../../model/parent";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";


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
  existingLogin: boolean = false
  existingTelephone: boolean = false
  existingCNI: boolean = false
  constructor (private adminService:AdminsService,
               private classeService:ClassesService,
               private form:FormBuilder,
               private parentService:ParentService,
               public matDialogRef : MatDialogRef<FormParentComponent>,
               private noticationService: NotificationsService) {}

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
  // verfication du login, telephone et cni avant passage au formulaire eleve
  verifyUniqueValues(name:string) {
    if(name == 'login'){
      this.adminService.findByLogin(this.formParent.value.login).subscribe({
        next:(data)=> {
          this.existingLogin = data != null;
        }
      })
    }
    if(name == 'telephone'){
      this.adminService.findByTelephone(this.formParent.value.telephone).subscribe({
        next:(data)=>{
          this.existingTelephone = data != null;
        }
      })
    }
    if(name == 'cni'){
      this.parentService.finByCni(this.formParent.value.cni).subscribe({
        next:(data)=>{
          this.existingCNI = data != null;
        }
      })
    }
  }
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
    this.adminService.findByLogin(parent.userName).subscribe({
      next:(data)=>{
        if (data != null){

        }else {

        }
      }
    })
    this.parentService.addParent(parent).subscribe({
      next:()=>{
        this.noticationService.successOrFailOperation(Constants.PARENT_ET_ELEVE_AJOUTE,Constants.SUCCESS_STYLE,'parents')
        this.matDialogRef.close()
      },
      error:error => {
        this.noticationService.successOrFailOperation(error.eroor.message,Constants.ERROR_STYLE,'parents')
        console.log(error)
      }
    })
  }

  get prenom(){return this.formParent.get('prenom')}
  get nom(){return this.formParent.get('nom')}
  get adresse(){return this.formParent.get('adresse')}
  get telephone(){return this.formParent.get('telephone')}
  get cni(){return this.formParent.get('cni')}
  get login(){return this.formParent.get('login')}
  get genre_id(){return this.formParent.get('genre_id')}
  get prenomEleve(){return this.formEleve.get('prenomEleve')}
  get nomEleve(){return this.formEleve.get('nomEleve')}
  get adresseEleve(){return this.formEleve.get('adresseEleve')}
  get genre_idEleve(){return this.formEleve.get('genre_idEleve')}
  get date_naissance(){return this.formEleve.get('date_naissance')}
  get annee(){return this.formEleve.get('annee')}

}
