import { Component, OnInit } from '@angular/core';
import { Reservering } from './reservering';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ReserveringModalComponent } from './modals/reservering-modal/reservering-modal.component';

@Component({
  selector: 'app-reserveringen',
  templateUrl: './reserveringen.component.html',
  styleUrls: ['./reserveringen.component.css']
})
export class ReserveringenComponent implements OnInit {

  //Array van reserveringen maken
  reserveringlijst: Reservering[] = [
    new Reservering(1, "Boek nummer 1", "Sofieke", "Niekolaas", "02/05/2022", 2, 1, 20),
    new Reservering(5, "Boek nummer 2", "Tako", "Forsten", "31/04/2022", 5, 3, 12),
    new Reservering(8, "Boek nummer 3", "Winnie", "Hoogakker", "25/04/2022", 0, 5, 10),
    new Reservering(10, "Boek nummer 4", "Gijs", "van Riel", "01/05/2022", 1, 2, 50)
  ];

  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal) {}

  closeResult: string = "";   
  public openBevestigingModal(tempReservering: Reservering, actie: string) {
    const modalRef = this.modalService.open(ReserveringModalComponent, {ariaLabelledBy: 'modal-basic-title', size: 'sm'});
    modalRef.componentInstance.fromParent = tempReservering;
    modalRef.componentInstance.actie = actie;
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

  public onGoedgekeurd(reservering: Reservering) {


  }

}
