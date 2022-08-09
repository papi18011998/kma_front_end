import { Component, OnInit } from '@angular/core';
import {AdminsService} from "../../service/admins.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Genre} from "../../model/genre";
import {Admin} from "../../model/admin";

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.css']
})
export class FormAdminComponent implements OnInit {
  constructor(private adminService:AdminsService,
              private fromBuilder:FormBuilder,
              private router:Router,
              private route:ActivatedRoute) { }
  existingLogin:boolean = false
  existingTelephone:boolean = false
  admins!:any
  test:number = 0
  adminToUpdate!:any
  genres!:Genre[]
  addAdminForm!:FormGroup
  is_update:boolean = false
  telephonePattern:string = '^(77|78|76|70|75)[0-9]{7}$'
  ngOnInit(): void {
    this.getGenres()
    if (this.route.snapshot.params['id']) {
      this.is_update = true
      // @ts-ignore
      this.adminToUpdate = JSON.parse(localStorage.getItem('admin'))
    }
    this.addAdminForm = this.fromBuilder.group({
      prenom: this.fromBuilder.control((this.is_update)?this.adminToUpdate.prenom:null, Validators.required),
      nom: this.fromBuilder.control((this.is_update)?this.adminToUpdate.nom:null, Validators.required),
      login: this.fromBuilder.control((this.is_update)?this.adminToUpdate.login:null, Validators.required),
      adresse: this.fromBuilder.control((this.is_update)?this.adminToUpdate.adresse:null, Validators.required),
      telephone: this.fromBuilder.control((this.is_update)?this.adminToUpdate.telephone:null, [Validators.pattern(this.telephonePattern), Validators.required]),
      genre_id: this.fromBuilder.control(null)
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
  async addAdmin() {
    // Ajout d'un nouvel admin
    const admin: Admin = {
      id: null,
      prenom: this.addAdminForm.value.prenom,
      nom: this.addAdminForm.value.nom,
      userName: this.addAdminForm.value.login,
      adresse: this.addAdminForm.value.adresse,
      telephone: this.addAdminForm.value.telephone,
      active: true,
      genre: {
        id: this.addAdminForm.value.genre_id,
        libelle: null
      }
    }
    await this.adminService.findByLogin(this.addAdminForm.value.login).subscribe({
      next:(data)=>{(data!=null)?this.existingLogin=true:this.existingLogin=false}
    })
    await this.adminService.findByTelephone(this.addAdminForm.value.telephone).subscribe({
      next: (data) => {
        (data != null) ? this.existingTelephone = true : this.existingTelephone = false;
        if (!this.existingLogin && !this.existingTelephone) {
          this.adminService.addAdmin(admin).subscribe({
            next: () => this.router.navigate(['admins']),
            error:(err)=>console.log(err)
          });
        }
      }
    })
    // Modification d'un admin
    if (this.is_update) {
      const admin: Admin = {
        id: this.adminToUpdate.id,
        prenom: this.addAdminForm.value.prenom,
        nom: this.addAdminForm.value.nom,
        userName: this.adminToUpdate.login,
        adresse: this.addAdminForm.value.adresse,
        telephone: this.adminToUpdate.telephone,
        active: true,
        genre: {
          id: this.addAdminForm.value.genre_id,
          libelle: null
        }
      }
      await this.adminService.updateAdmin(admin).subscribe({
        next: () =>{
          localStorage.removeItem('admin')
          this.router.navigate(['admins'])
        },
      })
    }
  }
  get prenom(){return this.addAdminForm.get('prenom')}
  get nom(){return this.addAdminForm.get('nom')}
  get login(){return this.addAdminForm.get('login')}
  get adresse(){return this.addAdminForm.get('adresse')}
  get telephone(){return this.addAdminForm.get('telephone')}
}
