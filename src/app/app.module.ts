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
import { RegisterComponent } from './components/register/register.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    ProfesseursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [NotifierService,AuthGuard,AuthenticationService,UserService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
