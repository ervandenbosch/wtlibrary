import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../service/current-user.service';
import { StatusHistory } from './statushistory';
import { reserveringService } from './reserveringen.service';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {
  
  public reserveringen!: StatusHistory[];
  public goedReservering!: StatusHistory; // | undefined;
  public afReservering!: StatusHistory;// | undefined;

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
      (response: StatusHistory[]) => {
        this.reserveringen = response;
        for (var i = 0; i < this.reserveringen.length; i++) {
          this.reserveringen[i].timestamp = this.convertTimestamp(this.reserveringen[i].timestamp);
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


  public openBevestigingModal(reservering: StatusHistory, actie: string) {
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
 
  public onGoedgekeurd(reservering: StatusHistory): void {
    let resObj = {
      admin_modif: true,
      active: true,
      status: "uitgeleend"}

    var reserveringJson = JSON.stringify(resObj);
    console.log(reserveringJson);
    this.reserveringService.goedkeurReservering(reserveringJson, reservering.user.id, reservering.exemplaar.id).subscribe(
      (response: StatusHistory) => {
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
