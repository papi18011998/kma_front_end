import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Matiere} from "../../model/matiere";
import {Classe} from "../../model/classe";
import {Genre} from "../../model/genre";
import {ProfesseursService} from "../../service/professeurs.service";
import {ClassesService} from "../../service/classes.service";
import {AdminsService} from "../../service/admins.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Professeur} from "../../model/professeur";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";

@Component({
  selector: 'app-form-professeur',
  templateUrl: './form-professeur.component.html',
  styleUrls: ['./form-professeur.component.css']
})
export class FormProfesseurComponent implements OnInit {

  addProfesseurForm!:FormGroup
  matieres!:Matiere[]
  classes!:Classe[]
  classesEnseignees!:[]
  existingLogin:boolean = false
  existingTelephone:boolean = false
  is_update:boolean = false
  professeurToUpdate:any
  genres!:Genre[];
  selectedGenre!:number;
  selectedMatire!:number;
  constructor(private formBuilder:FormBuilder,
              private professeurService:ProfesseursService,
              private classeService:ClassesService,
              private adminService:AdminsService,
              private route:Router,
              private routeParams:ActivatedRoute,
              public matDialogRef: MatDialogRef<FormProfesseurComponent>,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.getMatieres()
    this.getClasses()
    this.getGenres()

    if(localStorage.getItem('professeur')){
      this.is_update = true
      // @ts-ignore
      this.professeurToUpdate = JSON.parse(localStorage.getItem('professeur'))
      this.selectedGenre = this.professeurToUpdate.genre.id
      this.selectedMatire = this.professeurToUpdate.matiere.id
    }
    this.addProfesseurForm = this.formBuilder.group({
      prenom: this.formBuilder.control((this.is_update)?this.professeurToUpdate.prenom:null, Validators.required),
      nom: this.formBuilder.control((this.is_update)?this.professeurToUpdate.nom:null, Validators.required),
      login: this.formBuilder.control((this.is_update)?this.professeurToUpdate.userName:null, Validators.required),
      adresse: this.formBuilder.control((this.is_update)?this.professeurToUpdate.adresse:null, Validators.required),
      telephone: this.formBuilder.control((this.is_update)?this.professeurToUpdate.telephone:null, [Validators.pattern('^(77|78|76|70|75)[0-9]{7}$'), Validators.required]),
      genre_id: this.formBuilder.control((this.is_update)?this.selectedGenre:null),
      matiere_id: this.formBuilder.control((this.is_update)?this.selectedMatire:null),
      date_prise_fonction: this.formBuilder.control((this.is_update)?this.professeurToUpdate.date_prise_fonction:null,[Validators.required]),
      classes: new FormArray([],Validators.required)
    })
  }
  public getMatieres(){
    this.professeurService.getMateires().subscribe({
      next: (data) => {this.matieres=data}
    })
  }
  public getClasses(){
    this.classeService.getClasses().subscribe({
      next: (data) => {this.classes=data},
      error: (err) => {console.log(err)}
    })
  }

  public getGenres(){
    this.adminService.getGenres().subscribe({
      next:(data)=>{
        this.genres=data
      },
      error:(error)=> console.log(error)
    })
  }

  onCheckClass(event:any) {
    const checkedClasses = this.addProfesseurForm.controls['classes'] as FormArray;
    if (event.target.checked){
      checkedClasses.push(new FormControl(event.target.value))
    }else{
      const index = checkedClasses.controls.findIndex(x=> x.value===event.target.value)
      checkedClasses.removeAt(index)
    }
    this.classesEnseignees = checkedClasses.value
  }

  // verificcation du login et du telephone
  /**
   * Cette fonction permet de verifier si le login n'est pas deja pris
   * Elle ne s'applique que si nous sommes en situation de modifiction
   * @param name
   */
  verifyUniqueValues(name: string) {
      if (!this.is_update){
        if(name == 'login'){
          this.adminService.findByLogin(this.addProfesseurForm.value.login).subscribe({
            next:(data)=> {
              this.existingLogin = data != null;
            }
          })
        }
        if(name == 'telephone'){
          this.adminService.findByTelephone(this.addProfesseurForm.value.telephone).subscribe({
            next:(data)=>{
              this.existingTelephone = data != null;
            }
          })
        }
      }
  }
  submitProfesseur() {
    if (this.is_update){
      //Modification de professeur
      const professeur:Professeur ={
        professeurDTO: {
          id: this.professeurToUpdate.id,
          prenom: this.addProfesseurForm.value.prenom,
          nom: this.addProfesseurForm.value.nom,
          userName: this.professeurToUpdate.login,
          adresse: this.addProfesseurForm.value.adresse,
          active: true,
          genre: {
            id: this.addProfesseurForm.value.genre_id,
            libelle:null
          },
          telephone: this.addProfesseurForm.value.telephone,
          date_prise_fonction: this.addProfesseurForm.value.date_prise_fonction,
          matiere: {
            id: this.addProfesseurForm.value.matiere_id,
            libelle: null,
            coefficient: null
          }
        },
        classes: this.classesEnseignees
      }

      this.professeurService.updateProfesseur(professeur).subscribe({
        next:()=>{
          localStorage.removeItem('professeur')
          this.notificationService.successOrFailOperation(Constants.PROFESSEUR_MODIFIE,Constants.SUCCESS_STYLE,"professeurs")
          this.matDialogRef.close()
        },
        error:(err)=> {
          this.notificationService.successOrFailOperation(err.error.message, Constants.ERROR_STYLE, "professeurs")
          this.matDialogRef.close()
        }

      })
    }else{
      // Ajout de professeur
      const professeur:Professeur ={
        professeurDTO: {
          id: null,
          prenom: this.addProfesseurForm.value.prenom,
          nom: this.addProfesseurForm.value.nom,
          userName: this.addProfesseurForm.value.login,
          adresse: this.addProfesseurForm.value.adresse,
          active: true,
          genre: {
            id: this.addProfesseurForm.value.genre_id,
            libelle:null
          },
          telephone: this.addProfesseurForm.value.telephone,
          date_prise_fonction: this.addProfesseurForm.value.date_prise_fonction,
          matiere: {
            id: this.addProfesseurForm.value.matiere_id,
            libelle: null,
            coefficient: null
          }
        },
        classes: this.classesEnseignees
      }
      if (!this.existingLogin && !this.existingTelephone) {
        this.professeurService.addProfesseur(professeur).subscribe({
          next: () => {
            this.notificationService.successOrFailOperation(Constants.PROFESSEUR_AJOUTE,Constants.SUCCESS_STYLE,"professeurs")
            this.matDialogRef.close()
          },
          error:(err)=> {
            this.notificationService.successOrFailOperation(err.error.message, Constants.SUCCESS_STYLE, "professeurs")
            this.matDialogRef.close()
          }
        });
      }
    }
  }

  get prenom(){return this.addProfesseurForm.get('prenom')}
  get nom(){return this.addProfesseurForm.get('nom')}
  get login(){return this.addProfesseurForm.get('login')}
  get adresse(){return this.addProfesseurForm.get('adresse')}
  get telephone(){return this.addProfesseurForm.get('telephone')}
  get date_prise_fonction(){return this.addProfesseurForm.get('date_prise_fonction')}

}
