import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {AdminsComponent} from "./components/admins/admins.component";
import {FormAdminComponent} from "./components/form-admin/form-admin.component";
import {ClassesComponent} from "./components/classes/classes.component";
import {ProfesseursComponent} from "./components/professeurs/professeurs.component";
import {FormProfesseurComponent} from "./components/form-professeur/form-professeur.component";
import {ParentsComponent} from "./components/parents/parents.component";
import {FormParentComponent} from "./components/form-parent/form-parent.component";
import {ElevesComponent} from "./components/eleves/eleves.component";
import {FormEleveComponent} from "./components/form-eleve/form-eleve.component";
import {ClassesPerProfesseurComponent} from "./components/classes-per-professeur/classes-per-professeur.component";
import {ElevesPerClasseComponent} from "./components/eleves-per-classe/eleves-per-classe.component";
import {EvaluationFormComponent} from "./components/evaluation-form/evaluation-form.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {DetailsEleveComponent} from "./components/details-eleve/details-eleve.component";
import {MatieresComponent} from "./components/matieres/matieres.component";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"deconnexion",component:LoginComponent,canActivate:[AuthGuard]},
  {path:"admins", component: AdminsComponent,canActivate:[AuthGuard]},
  {path:"admins/add", component:FormAdminComponent,canActivate:[AuthGuard]},
  {path:"utilisateurs/:id", component:FormAdminComponent,canActivate:[AuthGuard]},
  {path:"classes",component:ClassesComponent,canActivate:[AuthGuard]},
  {path:"classes/add",component:ClassesComponent,canActivate:[AuthGuard]},
  {path:"classes/:id",component:ClassesComponent,canActivate:[AuthGuard]},
  {path:"classes/:id/:annee",component:ElevesPerClasseComponent,canActivate:[AuthGuard]},
  {path:"professeurs",component:ProfesseursComponent,canActivate:[AuthGuard]},
  {path:"professeurs/add",component:FormProfesseurComponent,canActivate:[AuthGuard]},
  {path:"professeurs/:id",component:FormProfesseurComponent,canActivate:[AuthGuard]},
  {path:"professeurs/:id/classes/:annee",component:ClassesPerProfesseurComponent,canActivate:[AuthGuard]},
  {path:"parents" ,component:ParentsComponent,canActivate:[AuthGuard]},
  {path:"parents/add",component:FormParentComponent,canActivate:[AuthGuard]},
  {path:"eleves" ,component:ElevesComponent,canActivate:[AuthGuard]},
  {path:"eleves/add",component:FormEleveComponent,canActivate:[AuthGuard]},
  {path:"eleves/:id",component: DetailsEleveComponent,canActivate:[AuthGuard]},
  {path:"evaluations",component:EvaluationFormComponent,canActivate:[AuthGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"matieres",component:MatieresComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
