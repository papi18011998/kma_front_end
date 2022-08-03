import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {NotifierService} from "angular-notifier";
import {NotificationService} from "../../service/notification.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../../enum/notification-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private showLoading: boolean = false;
  private subscription:Subscription[]=[]
  constructor(private router:Router, private authenticationService:AuthenticationService,
              private notifier:NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['/user/management'])
    }else{
      this.router.navigate(['/login'])
    }
  }
  public onLogin(user:User):void{
    this.showLoading =true
    this.subscription.push(
      this.authenticationService.login(user).subscribe({
        next:(response)=>{
          const token = response.headers.get('Jwt-Token')
          this.authenticationService.saveToken(token)
          this.authenticationService.addUserToLocalCache(user)
          this.router.navigate(['/user/management'])
          this.showLoading = false
        },
      error:(error)=>{
        console.log(error)
        this.sendErrorNotification(NotificationType.ERROR,error.error.message())
      }
      })
    )
    console.log(user)
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
      this.notifier.notify(notificationType,"WE HAVE AN ERROR PLEASE TRY AGAIN")
    }
  }
}
