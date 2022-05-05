import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservering } from '../../reservering';

@Component({
  selector: 'app-goedkeur-modal',
  templateUrl: './goedkeur-modal.component.html',
  styleUrls: ['./goedkeur-modal.component.css']
})

export class GoedkeurModalComponent implements OnInit {
  
  @Input() 
  fromParent!: Reservering;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    
  }

  closeModal(abc: string) {
    this.activeModal.close(abc);
  }
}
