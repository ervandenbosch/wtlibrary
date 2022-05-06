import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservering } from '../../reservering';

@Component({
  selector: 'app-reservering-modal',
  templateUrl: './reservering-modal.component.html',
  styleUrls: ['./reservering-modal.component.css']
})

export class ReserveringModalComponent implements OnInit {
  
  @Input() 
  fromParent!: Reservering;

  @Input() 
  actie!: String;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    
  }

  closeModal(abc: string) {
    this.activeModal.close(abc);
  }
}
