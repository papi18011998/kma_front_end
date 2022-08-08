import { Component, OnInit } from '@angular/core';
import {Admin} from "../../model/admin";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminsService} from "../../service/admins.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins!:Admin[]
  page: number = 1;
  searchForm!:FormGroup
  constructor(private adminsService:AdminsService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      nom: this.formBuilder.control(null)
    })
    this.getAdmins()
  }
  public getAdmins(){
    this.adminsService.getAdmins().subscribe({
      next:(data)=>{this.admins=data},
      error:(error)=>{console.log(error)}
    })
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
    this.admins = this.adminsService.searchAdmin(this.searchForm.value.nom.toLowerCase())
  }

  changeStatus(id:number) {
    let response = confirm("Voulez-vous vraiment changer le status de cet utilisateur ?")
    if (response){
      this.adminsService.changeStatus(id).subscribe({
        next:(data)=>{this.getAdmins()},
        error:(error)=>{console.log(error)}
      })
    }
  }

  goTo(id:number) {
    let founded = this.admins.find(admin => admin.id == id)
    localStorage.setItem('admin',JSON.stringify(founded).toString())
    this.router.navigate(['/utilisateurs/'+id])
  }

}
