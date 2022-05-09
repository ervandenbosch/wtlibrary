import { Component, OnInit } from '@angular/core';
import { Reservering } from './reservering';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {

  //Array van reserveringen maken
  public reserveringlijst: Reservering[] = [
    new Reservering(1, "Boek nummer 1", "Sofieke Niekolaas", "02/05/2022", 2, 1, 20),
    new Reservering(5, "Boek nummer 2", "Tako Forsten", "31/04/2022", 5, 3, 12),
    new Reservering(8, "Boek nummer 3", "Winnie Hoogakker", "25/04/2022", 0, 5, 10),
    new Reservering(10, "Boek nummer 4", "Gijs van Riel", "01/05/2022", 1, 2, 50)
  ];

  public goedReservering!: Reservering; // | undefined;
  public afReservering!: Reservering;// | undefined;

  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal) {}

  public openBevestigingModal(reservering: Reservering, actie: string) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (actie === 'goedkeuren'){ 
      this.goedReservering = reservering;
      button.setAttribute('data-target', '#goedkeurModal')
    }
    if (actie === 'afkeuren'){ 
      this.afReservering = reservering;
      button.setAttribute('data-target', '#afkeurModal')
    }
    container?.appendChild(button);
    button.click();
  }
 
  public onGoedgekeurd(reservering: Reservering) {

  }

  public onAfgekeurd(reservering: Reservering) {

  }

}
