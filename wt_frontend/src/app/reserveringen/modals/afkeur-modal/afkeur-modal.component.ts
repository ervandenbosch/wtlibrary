import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservering } from '../../reservering';

@Component({
  selector: 'app-afkeur-modal',
  templateUrl: './afkeur-modal.component.html',
  styleUrls: ['./afkeur-modal.component.css']
})
export class AfkeurModalComponent implements OnInit {
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


