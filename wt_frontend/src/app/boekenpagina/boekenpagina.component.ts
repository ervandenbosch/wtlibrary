import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boekenpagina',
  templateUrl: './boekenpagina.component.html',
  styleUrls: ['./boekenpagina.component.css']
})

export class BoekenpaginaComponent implements OnInit {

  titel = "Harry Potter and the Goblet of Fire"
  fotoPad = "../../assets/images/harry.jpg"
  beschrijving = `Harry Potter en de Vuurbeker (oorspronkelijke titel: Harry Potter and the Goblet of Fire) is de vierde
  Harry-Potterfilm, gebaseerd op het gelijknamige boek van de Britse schrijfster J.K. Rowling. De film
  ging in première op 18 november 2005.
  Mike Newell regisseerde de film en Steve Kloves schreef het script. De themamuziek van John Williams
  werd opnieuw gebruikt en aangevuld met muziek van Patrick Doyle.
  De film was genomineerd voor een Academy Award, namelijk die voor de beste artdirection, maar won deze
  uiteindelijk niet.`
  categorieen = ["Fantasy"," Avontuur"]
  beschikbaar = "Beschikbaar"


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  handleReservering() {
    this.router.navigate([''])
  }

}
