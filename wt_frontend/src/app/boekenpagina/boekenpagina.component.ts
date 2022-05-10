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

export class BoekenpaginaComponent implements OnInit {

  public boeken: Boek[] | undefined;
  public editBoek: Boek | undefined;
  public boekAvailable: boolean | undefined;



  public getBoek(): void {

    this.boekService.getBoek(this.route.snapshot.params['title']).subscribe(

    (response: Boek) => {
      this.editBoek = response;
      if (this.editBoek.available > 0) {this.boekAvailable = true} else {this.boekAvailable = false}
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    
    )
    
  }

  public onUpdate(boek : Boek) {
    boek.available = boek.available - 1
    this.boekService.updateBoek(boek).subscribe(
      (response: Boek) => {
        console.log(response);
        this.getBoek();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  is_beschikbaar = false;

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




  

  ngOnInit(): void {
    this.getBoek()
   

    
  }
}
