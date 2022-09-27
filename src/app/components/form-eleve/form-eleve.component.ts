import {Component, OnInit} from '@angular/core';
import {Genre} from "../../model/genre";
import {Classe} from "../../model/classe";
import {ParentModelGet} from "../../model/parent-model-get";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ElevesService} from "../../service/eleves.service";
import {AdminsService} from "../../service/admins.service";
import {ParentService} from "../../service/parent.service";
import {ClassesService} from "../../service/classes.service";
import {Router} from "@angular/router";
import {Eleve} from "../../model/eleve";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";


@Component({
  selector: 'app-form-eleve',
  templateUrl: './form-eleve.component.html',
  styleUrls: ['./form-eleve.component.css']
})
export class FormEleveComponent implements OnInit {

  genres!:Genre[]
  parents!:any
  classes!:Classe[]
  is_update:boolean=false
  cni_exist:boolean=false
  parent!:ParentModelGet
  eleveForm!: FormGroup
  parentForm!:FormGroup
  constructor(private eleveService:ElevesService,
              private adminService:AdminsService,
              private parentService:ParentService,
              private classeService:ClassesService,
              private form:FormBuilder,
              private router:Router,
              public matDialogRef: MatDialogRef<FormEleveComponent>,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.getGenre()
    this.getClasses()
    this.eleveForm = this.form.group({
      prenom : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      nom : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      adresse : this.form.control(null,[Validators.required,Validators.max(100),Validators.min(3)]),
      date_naissance: this.form.control(null,[Validators.required]),
      genre_id : this.form.control(null,[Validators.required]),
      classe_id : this.form.control(null,[Validators.required])
    })
    this.parentForm = this.form.group({
      prenomParent : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      nomParent : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      adresseParent : this.form.control(null,[Validators.required,Validators.max(100),Validators.min(3)]),
      telephone: this.form.control(null,[Validators.required,Validators.pattern('^(77|78|76|70|75)[0-9]{7}$')]),
      cni: this.form.control(null,[Validators.required,Validators.pattern('^(1|2)[0-9]{12}$')]),
      userName : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      genre_idParent : this.form.control(null,[Validators.required])
    })
  }
  public getGenre(){
    this.adminService.getGenres().subscribe({
      next: (data) => {this.genres=data},
      error:(error)=>console.log(error)
    })
  }

  private getClasses() {
    this.classeService.getClasses().subscribe({
      next: (data) => {this.classes=data},
      error:(error)=>console.log(error)
    })
  }
  public findByCni(){
    if (this.parentForm.value.cni.length == 13){
      this.parentService.finByCni(this.parentForm.value.cni).subscribe({
        next: (data) => {
          if (data == null) {
            this.cni_exist = false
          } else {
            this.parent = data
            this.parentForm.patchValue({
              prenomParent: this.parent.prenom,
              nomParent: this.parent.nom,
              adresseParent: this.parent.adresse,
              genre_idParent: this.parent.genre.id,
              telephone: this.parent.telephone,
              userName: this.parent.userName
            })
            this.cni_exist = true
          }
        },
        error: (error) => console.log(error)
      })
    }
  }

  submitForm() {
    console.log(this.parentForm.value)
    console.log(this.eleveForm.value)
    if(this.is_update){
      //Modification d'eleve
    }else{
      //Ajout d'eleve
      const eleve:Eleve ={
        id:null,
        prenom: this.eleveForm.value.prenom,
        nom: this.eleveForm.value.nom,
        adresse: this.eleveForm.value.adresse,
        genre_id: this.eleveForm.value.genre_id,
        date_naissance: this.eleveForm.value.date_naissance,
        annee: this.eleveForm.value.classe_id,

        prenomParent: (this.parent)?this.parent.prenom:this.parentForm.value.prenomParent,
        nomParent: (this.parent)?this.parent.nom:this.parentForm.value.nomParent,
        adresseParent: (this.parent)?this.parent.adresse:this.parentForm.value.adresseParent,
        telephone: (this.parent)?this.parent.telephone:this.parentForm.value.telephone,
        cni: (this.parent)?this.parent.cni:this.parentForm.value.cni,
        userName: (this.parent)?this.parent.userName:this.parentForm.value.userName,
        genreIdParent: (this.parent)?this.parent.genre.id:this.parentForm.value.genre_idParent,
      }
      this.eleveService.addEleve(eleve).subscribe({
        next: () => {
          this.notificationService.successOrFailOperation(Constants.ELEVE_AJOUTE,Constants.SUCCESS_STYLE,"eleves")
          this.matDialogRef.close()
        },
        error: (error) => {
          this.notificationService.successOrFailOperation(error.error.message,Constants.ERROR_STYLE,"eleves")
          this.matDialogRef.close()
        }
      })
    }
  }
  get prenom(){return this.eleveForm.get('prenom')}
  get nom(){return this.eleveForm.get('nom')}
  get adresse(){return this.eleveForm.get('adresse')}
  get telephone(){return this.eleveForm.get('telephone')}
  get date_naissance(){return this.eleveForm.get('date_naissance')}
  get prenomParent(){return this.parentForm.get('prenomParent')}
  get nomParent(){return this.parentForm.get('nomParent')}
  get adresseParent(){return this.parentForm.get('adresseParent')}
  get cni(){return this.parentForm.get('cni')}
  get userName(){return this.parentForm.get('userName')}
  get genre_idParent(){return this.parentForm.get('genre_idParent')}

}
