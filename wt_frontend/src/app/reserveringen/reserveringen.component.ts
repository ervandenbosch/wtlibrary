import { Component, OnInit } from '@angular/core';
import { Reservering } from './reservering';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GoedkeurModalComponent } from './modals/goedkeur-modal/goedkeur-modal.component';
import { AfkeurModalComponent } from './modals/afkeur-modal/afkeur-modal.component';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {

  //Array van reserveringen maken
  reserveringlijst: Reservering[] = [
    new Reservering("Boek nummer 1", "Sofieke", "Niekolaas", "02/05/2022", 2),
    new Reservering("Boek nummer 2", "Tako", "Forsten", "31/04/2022", 5),
    new Reservering("Boek nummer 3", "Winnie", "Hoogakker", "25/04/2022", 0),
    new Reservering("Boek nummer 4", "Gijs", "van Riel", "01/05/2022", 1)
  ];

  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal) {}

  closeResult = "";   
  openGoedkeurModal(tempReservering: Reservering) {
    const modalRef = this.modalService.open(GoedkeurModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.fromParent = tempReservering;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  openAfkeurModal(tempReservering: Reservering) {
    const modalRef = this.modalService.open(AfkeurModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.fromParent = tempReservering;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
