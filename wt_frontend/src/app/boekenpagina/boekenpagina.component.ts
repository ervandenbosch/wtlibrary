import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Boek } from './boek';

@Component({
  selector: 'app-boekenpagina',
  templateUrl: './boekenpagina.component.html',
  styleUrls: ['./boekenpagina.component.css']
})

export class BoekenpaginaComponent implements OnInit {

  boekenlijst: Boek[] = [
    new Boek(1, "3205173257987", "The Lord of the Rings", 5, 3, "ITS A RING TING", "../../assets/images/lotr.jpg"),
    new Boek(2, "0648378181067", "The Bible", 10, 7, "Jesus", "../../assets/images/bible.jpg"),
    new Boek(3, "4778995981189", "Words on Multiple Pages", 20, 12, "I present to you these words", "../../assets/images/words.jpeg"),
    new Boek(4, "9556230610350", "The Full and Exciting History of the Potato", 3, 0, "There once was a potato..", "../../assets/images/potato.jpg"),
    new Boek(5, "6628248015665", "How to Get Away With Stealing 2 Bananas", 6, 1, "you dont", "../../assets/images/banana.jpg")
  ];

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
