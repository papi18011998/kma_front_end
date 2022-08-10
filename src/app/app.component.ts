import { Component } from '@angular/core';
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'get_arrays_front_end';
  user:User = this.getUser()
  constructor() { }
  public getUser():User{
    return JSON.parse(localStorage.getItem('user')!)
  }
}
