import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Boek } from './boek';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-boekenlijst',
  templateUrl: './boekenlijst-bootstrap.component.html',
  styleUrls: ['./boekenlijst.component.css'],
})
export class BoekenlijstComponent implements OnInit {


  closeResult: string = '';

  //Array van objecten maken
  boekenlijst: Boek[] = [
    new Boek(1, "3205173257987", "The Lord of the Rings", 5, 3),
    new Boek(2, "0648378181067", "The Bible", 10, 7),
    new Boek(3, "4778995981189", "Words on Multiple Pages", 20, 12),
    new Boek(4, "9556230610350", "The Full and Exciting History of the Potato", 3, 0),
    new Boek(5, "6628248015665", "How to Get Away With Stealing 2 Bananas", 6, 1)
  ];

  ngOnInit(): void {
  }
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private modalService: NgbModal) {}
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
     
  /**
   * Write code on Method
   *
   * @return response()
   */
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
