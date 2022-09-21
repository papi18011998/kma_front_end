import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "./service/authentication.service";
import {UserService} from "./service/user.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthGuard} from "./guard/auth.guard";
import {NotifierModule, NotifierService} from "angular-notifier";
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminsComponent } from './components/admins/admins.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ElevesComponent } from './components/eleves/eleves.component';
import { FormAdminComponent } from './components/form-admin/form-admin.component';
import { FormEleveComponent } from './components/form-eleve/form-eleve.component';
import { FormParentComponent } from './components/form-parent/form-parent.component';
import { FormProfesseurComponent } from './components/form-professeur/form-professeur.component';
import { MenuComponent } from './components/menu/menu.component';
import { ParentsComponent } from './components/parents/parents.component';
import { ProfesseursComponent } from './components/professeurs/professeurs.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ClassesPerProfesseurComponent } from './components/classes-per-professeur/classes-per-professeur.component';
import { ElevesPerClasseComponent } from './components/eleves-per-classe/eleves-per-classe.component';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsEleveComponent } from './components/details-eleve/details-eleve.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { FormClasseComponent } from './components/form-classe/form-classe.component';
import { MatieresComponent } from './components/matieres/matieres.component';
import { FormMatiereComponent } from './components/form-matiere/form-matiere.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminsComponent,
    ClassesComponent,
    ElevesComponent,
    FormAdminComponent,
    FormEleveComponent,
    FormParentComponent,
    FormProfesseurComponent,
    MenuComponent,
    ParentsComponent,
    ProfesseursComponent,
    ClassesPerProfesseurComponent,
    ElevesPerClasseComponent,
    EvaluationFormComponent,
    DashboardComponent,
    DetailsEleveComponent,
    FormClasseComponent,
    MatieresComponent,
    FormMatiereComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [NotifierService,AuthGuard,AuthenticationService,UserService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
