import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {NotifierService} from "angular-notifier";
import {NotificationService} from "../../service/notification.service";
import {User} from "../../model/user";
import {interval, Subscription, take} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../../enum/notification-type";
import {HearderType} from "../../enum/hearder-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription:Subscription[]=[]
  constructor(private router:Router,
              private authenticationService:AuthenticationService,
              private notifier:NotificationService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['dashboard'])
    }else{
      this.router.navigate(['/login'])
    }
    if (this.route.snapshot.url[0].path == 'deconnexion'){
      this.logout()
      location.reload()
    }
  }
  public onLogin(user: User): void {
    this.subscription.push(
      this.authenticationService.login(user).subscribe(
        (response) => {
          const token = response.headers.get(HearderType.JWT_TOKEN);
          this.authenticationService.saveToken(token!);
          this.authenticationService.addUserToLocalCache(response.body!);
          window.location.href = "dashboard"
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse)
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription=>{
      subscription.unsubscribe()
    })
  }

  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if(message){
      this.notifier.notify(notificationType,message)
    }else{
      this.notifier.notify(notificationType,"Un problème est survenu lors de l'authentification")
    }
  }
  logout(){
    this.authenticationService.logout()
  }
}
