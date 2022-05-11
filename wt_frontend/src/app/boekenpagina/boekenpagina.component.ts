// IMPORTS
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Boek } from '../boekenlijst/boek';
import { boekService } from './boekenpagina.service';
import { HttpErrorResponse } from '@angular/common/http';

// COMPONENT EIGENSCHAPPEN
@Component({
  selector: 'app-boekenpagina',
  templateUrl: './boekenpagina.component.html',
  styleUrls: ['./boekenpagina.component.css']
})

// CLASS BoekenpaginaComponent
export class BoekenpaginaComponent implements OnInit {

  //Attributen
  public boeken: Boek[] | undefined;
  public editBoek: Boek | undefined;
  public isAvailable: boolean | undefined;
  public boekGereserveerd: boolean | undefined = false;


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
    boek.available = boek.available - 1
    this.boekService.updateBoek(boek).subscribe(
      (response: Boek) => {
        console.log(response);
        this.getBoek();
        this.boekGereserveerd = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private modalService: NgbModal,
    private boekService: boekService
  ) { }






  
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
    this.getBoek()
   

    
  }
}
