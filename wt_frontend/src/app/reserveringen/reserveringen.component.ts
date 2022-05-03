import { Component, OnInit } from '@angular/core';
import { Reservering } from './reservering';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {

  //Array van reserveringen maken
  reserveringlijst: Reservering[] = [
    new Reservering("Boek nummer 1", "Sofieke", "Niekolaas", "02/05/2022"),
    new Reservering("Boek nummer 2", "Tako", "Forsten", "31/04/2022"),
    new Reservering("Boek nummer 3", "Winnie", "Hoogakker", "25/04/2022"),
    new Reservering("Boek nummer 4", "Gijs", "van Riel", "01/05/2022")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
