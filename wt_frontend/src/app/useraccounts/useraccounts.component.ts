import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useraccounts',
  templateUrl: './useraccounts.component.html',
  styleUrls: ['./useraccounts.component.css']
})

export class UseraccountsComponent implements OnInit {

  //array van users
  accountlist: User[] = [
    new User(0, "Jorrit", "van der Kooi"),
    new User(1, "Bert", "Achternaam 1"),
    new User(2, "Sanne", "Achternaam 2"),
    new User(3, "Klaas", "Achternaam 3"),
    new User(4, "Tom", "Achternaam 4"),
    new User(5, "Eva", "Achternaam 5"),
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}

export class User{

  userID: number = 0
  firstName = ''
  lastName = ''

  constructor(userID : number, firstName: string, lastName: string){
    this.userID = userID
    this.firstName = firstName
    this.lastName = lastName
    
  }

}
