import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }
  // operation après succes ou echec
  successOrFailOperation(message:string,panelClass:string,url:string){
    //Si l'operation est un succes
    if (panelClass =='mycssSnackbarGreen'){
      this.router.routeReuseStrategy.shouldReuseRoute = ()=> false
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigate([url],{
        relativeTo: this.route
      })
    }
    if (message!=''){
      this.snackBar.open(message, 'OK', {
        verticalPosition: 'bottom',
        duration: 4000,
        panelClass: [panelClass]
      });
    }
  }
}
