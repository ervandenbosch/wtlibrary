import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Reservering } from './reservering';
import { reserveringService } from './reserveringen.service';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {
  //Array van reserveringen maken
  // public reserveringlijst: Reservering[] = [
  //   new Reservering(1, "Boek nummer 1", "Sofieke Niekolaas", "02/05/2022", 2, 1, 20),
  //   new Reservering(5, "Boek nummer 2", "Tako Forsten", "31/04/2022", 5, 3, 12),
  //   new Reservering(8, "Boek nummer 3", "Winnie Hoogakker", "25/04/2022", 0, 5, 10),
  //   new Reservering(10, "Boek nummer 4", "Gijs van Riel", "01/05/2022", 1, 2, 50)
  // ];
  
  public reserveringen!: Reservering[];
  public goedReservering!: Reservering; // | undefined;
  public afReservering!: Reservering;// | undefined;

  constructor(private reserveringService: reserveringService) {}

  public convertTimestamp(timestamp: string) {
    var date = new Date(timestamp);
    var newTimestamp = [([
        ("0" + date.getDate()).slice(-2),
        ("0" + (date.getMonth()+1)).slice(-2),
        date.getFullYear()
      ].join('/')), ([
        ("0" + date.getHours()).slice(-2),
        ("0" + date.getMinutes()).slice(-2)
      ].join(':'))
      ].join(" ");
    return newTimestamp
  }

  public getReserveringen(): void {
    this.reserveringService.getReserveringen().subscribe(
      (response: Reservering[]) => {
        this.reserveringen = response;
        for (var i = 0; i < this.reserveringen.length; i++) {
          this.reserveringen[i].timestamp = this.convertTimestamp(this.reserveringen[i].timestamp);
          console.log(this.convertTimestamp(this.reserveringen[i].timestamp)); 
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  ngOnInit(): void {
    this.getReserveringen()
  }


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
    // if (actie === 'afkeuren'){ 
    //   this.afReservering = reservering;
    //   button.setAttribute('data-target', '#afkeurModal')
    // }
    container?.appendChild(button);
    button.click();
  }
 
  public onGoedgekeurd(reservering: Reservering): void {
    console.log("goedgekeurd is geklikt");
    // var hi: Object = {
    //   admin_modif = true,
    //   active = true,
    //   status = "uitgeleend"};
    // };
    let resObj = {
      admin_modif: true,
      active: true,
      status: "uitgeleend"}

    var reserveringJson = JSON.stringify(resObj);
    console.log(reserveringJson);
    this.reserveringService.goedkeurReservering(reserveringJson, reservering.user.id, reservering.exemplaar.id).subscribe(
      (response: Reservering) => {
        console.log(response);
        this.getReserveringen();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  // public onAfgekeurd(reservering: Reservering) {

  // }

}
