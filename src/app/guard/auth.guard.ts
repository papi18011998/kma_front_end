import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {NotificationType} from "../enum/notification-type";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationService:AuthenticationService,private router:Router,
              private notificationService:NotificationService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn()
  }
  private isUserLoggedIn():boolean{
    if(this.authenticationService.isUserLoggedIn()){
      return true
    }
      this.router.navigate(['/login'])
      //send notification to user
      this.notificationService.notify(NotificationType.ERROR, `Vous devrez vous connecter pour accéder à cette page`)
      return false
  }
}
