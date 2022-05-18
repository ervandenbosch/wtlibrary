// IMPORTS
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Boek } from '../boekenlijst/boek';
import { boekService } from './boekenpagina.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Exemplaar } from '../reserveringen/exemplaar';
import { ExemplaarService } from '../exemplaar/exemplaar.service';
import { reserveringService } from '../reserveringen/reserveringen.service';
import { StatusHistory } from '../reserveringen/statushistory';
import { CurrentUserService } from '../service/current-user.service';
import { logboekService } from '../logboek/logboek.service';
import { TokenStorageService } from '../service/token-storage.service';

// COMPONENT EIGENSCHAPPEN
@Component({
  selector: 'app-boekenpagina',
  templateUrl: './boekenpagina.component.html',
  styleUrls: ['./boekenpagina.component.css']
})

// CLASS BoekenpaginaComponent
export class BoekenpaginaComponent implements OnInit {

  //Attributen
  public reserveringen!: StatusHistory[]
  public exemplaren!: Exemplaar[];
  public editBoek: Boek | undefined;
  public editBoek2: Boek | undefined;
  public editExemplaar: Exemplaar | undefined;
  public editReservering: StatusHistory | undefined;
  public isAvailable: boolean | undefined;
  public boekGereserveerd: boolean | undefined = false
  public aantal: number | undefined 
  public currentUser: any;
  isAdmin = false;


  //Functie die het juiste boek ophaalt op basis van de id (title) in de URL
  public getBoek(): void {

    this.boekService.getBoek(this.route.snapshot.params['title']).subscribe(
      //Checkt of "aantal beschikbaar" van Boek object groter is dan 0 en sets de isAvailable overeenkomstig
    (response: Boek) => {
      this.editBoek = response;
      if (this.editBoek.available > 0) {this.isAvailable = true} else {this.isAvailable = false}
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    )
  }



  //Functie het aantal beschikbare exemplaren met 1 verminderd na een reservering
  public onUpdate(boek : Boek) {
    boek.available = boek.available - 1;
    this.boekService.updateBoek(boek).subscribe(
      (response: Boek) => {
        this.getBoek();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.exemplaarService.getExemplarenBybookId(boek.id).subscribe(
      (response: Exemplaar[]) => {
        console.log(response)
        for (var exemplaar of response) {
          if (exemplaar.staat === "beschikbaar") {
            console.log(exemplaar)
            let resObj = {

              admin_modif: false,
              active: true,
              status: "gereserveerd"}

            var reserveringJson = JSON.stringify(resObj);
            this.reserveringService.goedkeurReservering(reserveringJson, this.currentUser.id , exemplaar.id).subscribe(
              (response: StatusHistory) => {
                this.getReserveringen();
                this.getExemplaren();
              },
              (error: HttpErrorResponse) => {
                alert(error.message);
              }
            );
            break
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

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

  public getReserveringen (){
    this.logboekService.getBoek(this.route.snapshot.params['title']).subscribe(
      (response: StatusHistory[]) => {
        this.reserveringen = response;
        for (var i = 0; i < this.reserveringen.length; i++) {
          this.reserveringen[i].timestamp = this.convertTimestamp(this.reserveringen[i].timestamp);
          if (this.reserveringen[i].user.id == this.currentUser.id) {
            this.boekGereserveerd = true;
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getExemplaren () {
    this.exemplaarService.getExemplarenBybookId(this.route.snapshot.params['title']).subscribe(
      (response: Exemplaar[]) => {
        this.exemplaren = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public isReserved(reservering: StatusHistory, exemplaar: Exemplaar): boolean{
    var reserved = false;
    if (exemplaar.id == reservering.exemplaar.id){
      reserved = true;
    }
    return reserved;
  }

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private modalService: NgbModal,
    private boekService: boekService,
    private exemplaarService: ExemplaarService,
    private reserveringService: reserveringService,
    private CurrentUserService: CurrentUserService,
    private logboekService: logboekService,
    private tokenStorageService: TokenStorageService
  ) { }


    public getStatus(boek: Boek){
      this.editBoek2 = boek
      this.logboekService.getBoekenExemplaar(this.editBoek2.id).subscribe(
        (response: StatusHistory[]) => {
          console.log(response)
          return true;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      return false;
    }
  
  closeResult: string = '';


  // POP UP METHODS
  public onOpenModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#deleteBoekModal');
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal2(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#okBoekModal');
    container?.appendChild(button);
    button.click();
  }

  ngOnInit(): void {
    this.getBoek();
    this.getReserveringen();
    this.getExemplaren();
    this.CurrentUserService.getCurrentUser();
    this.currentUser = this.CurrentUserService.currentUser;
    this.isAdmin = !!this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN');

  }
}
