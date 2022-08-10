import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user!:User|null
  constructor() { }

  ngOnInit(): void {
    this.getUser()
  }
  public getUser(){
    this.user = JSON.parse(localStorage.getItem('user')!)
  }
}
