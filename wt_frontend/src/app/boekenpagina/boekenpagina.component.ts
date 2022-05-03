//imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Boek } from './boek';

//component eigenschappen
@Component({
  selector: 'app-boekenpagina',
  templateUrl: './boekenpagina.component.html',
  styleUrls: ['./boekenpagina.component.css']
})

export class BoekenpaginaComponent implements OnInit {


  //Lijst met boek-objecten
  boekenlijst: Boek[] = [
    new Boek(0, "3205173257987", "The Lord of the Rings", 5, 3, "ITS A RING TING", "../../assets/images/lotr.jpg", ["Fantasy", " Avontuur"]),
    new Boek(1, "0648378181067", "The Bible", 10, 7, "Jesus Jesus Jesus Jesus Jesus Jesus", "../../assets/images/bible.jpg", ["Religie", " Christendom"]),
    new Boek(2, "4778995981189", "Words on Multiple Pages", 20, 12, "I present to you these words.. these words I present to you these words.. these words", "../../assets/images/words.jpeg", ["Fictie", " Humor"]),
    new Boek(3, "9556230610350", "The Full and Exciting History of the Potato", 3, 0, "There once was a potato.. There once was a potato.. There once was a potato..", "../../assets/images/potato.jpg", ["Landbouw", " Voedsel"]),
    new Boek(4, "6628248015665", "How to Get Away With Stealing 2 Bananas", 6, 1, "you dont", "../../assets/images/banana.jpg", ["Detective", " Misdaad"]),
    new Boek(5, "3120310302130", "Harry Potter and the Goblet of Fire", 5, 2, `Harry Potter en de Vuurbeker (oorspronkelijke titel: Harry Potter and the Goblet of Fire) is de vierde
                                  Harry-Potterfilm, gebaseerd op het gelijknamige boek van de Britse schrijfster J.K. Rowling. De film
                                  ging in première op 18 november 2005.
                                  Mike Newell regisseerde de film en Steve Kloves schreef het script. De themamuziek van John Williams
                                  werd opnieuw gebruikt en aangevuld met muziek van Patrick Doyle.
                                  De film was genomineerd voor een Academy Award, namelijk die voor de beste artdirection, maar won deze
                                  uiteindelijk niet.`, "../../assets/images/harry.jpg", ["Avontuur", " Fantasy"])
  ];

  is_beschikbaar = false;

  constructor(
    private router: Router,
    private route:ActivatedRoute
  ) { }

    id = 0

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    if (this.boekenlijst[this.id].n_available > 0) {
      this.is_beschikbaar = true;
    }
  }



}
