import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {NotificationService} from "../../service/notification.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {HearderType} from "../../enum/hearder-type";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription:Subscription[]=[]
  constructor(private router:Router,
              private authenticationService:AuthenticationService,
              private route:ActivatedRoute,
              private notificationService:NotificationsService) { }

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
          this.sendErrorNotification(Constants.ERROR_STYLE, errorResponse.error.message);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription=>{
      subscription.unsubscribe()
    })
  }

  private sendErrorNotification(constant: Constants, message: string) {
    if(message){
      this.notificationService.successOrFailOperation(message,constant,'')
    }else{
      this.notificationService.successOrFailOperation(Constants.ERROR_OCCURED,constant,'')
    }
  }
  logout(){
    this.authenticationService.logout()
  }
}
