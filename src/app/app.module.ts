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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule
  ],
  providers: [NotifierService,AuthGuard,AuthenticationService,UserService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
