import { Component, OnInit } from '@angular/core';
import { Boek } from './boek';
import { boekService } from './boekenlijst.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-boekenlijst',
  templateUrl: './boekenlijst.component.html',
  styleUrls: ['./boekenlijst.component.css'],
})

export class BoekenlijstComponent implements OnInit {

  public boeken: Boek[] | undefined;
  public editBoek: Boek | undefined;
  public deleteBoek: Boek | undefined;
  

    constructor(private boekService: boekService) {}

  public getBoeken(): void {

    this.boekService.getBoeken().subscribe(

    (response: Boek[]) => {
      this.boeken = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    } 
    )
  }


  ngOnInit(){
    this.getBoeken();
  }

  public onAddBoek(addForm: NgForm): void {
    document.getElementById('add-boek-form')?.click();
    this.boekService.addBoek(addForm.value).subscribe(
      (response: Boek) => {
        console.log(response);
        this.getBoeken();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public setReserved(): void{
    const row = document.getElementById('main-row');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.backgroundColor = 'green'
    row?.appendChild(button);
    button.click();
  }

  public onUpdateBoek(boek: Boek): void {
    this.boekService.updateBoek(boek).subscribe(
      (response: Boek) => {
        console.log(response);
        this.getBoeken();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteBoek(boekId: number): void {
    this.boekService.deleteBoek(boekId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBoeken();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public createBoek(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    button.setAttribute('data-target', '#addBoekModal');
    container?.appendChild(button);
    button.click();
  }

  public searchBoek(key: string): void{
    const results: Boek[] = [];
    for (const boek of this.boeken!) {
      if (boek.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  boek.authors.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  boek.isbn.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  boek.categories.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||  boek.categories.toLowerCase().indexOf(key.toLowerCase()) !== -1) 
      {
        results.push(boek);
      }
    }
    this.boeken = results;
    if (results.length === 0 || !key) {
      setTimeout('', 5000);
      this.getBoeken();
    }
  }

  public onOpenModal(boek: Boek, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBoekModal');
    }
    if (mode === 'edit') {
      this.editBoek = boek;
      button.setAttribute('data-target', '#editBoekModal');
    }
    if (mode === 'delete') {
      this.deleteBoek = boek;
      button.setAttribute('data-target', '#deleteBoekModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
  // closeResult: string = '';

  // Array van objecten maken
  // boekenlijst: Boek[] = [
  //   new Boek(1, "3205173257987", "The Lord of the Rings", 5, 3),
  //   new Boek(2, "0648378181067", "The Bible", 10, 7),
  //   new Boek(3, "4778995981189", "Words on Multiple Pages", 20, 12),
  //   new Boek(4, "9556230610350", "The Full and Exciting History of the Potato", 3, 0),
  //   new Boek(5, "6628248015665", "How to Get Away With Stealing 2 Bananas", 6, 1),
  //   new Boek(6, "efqgw, ", "rgibwerg", 6, 7)
  // ];

  // /*------------------------------------------
  // --------------------------------------------
  // Created constructor
  // --------------------------------------------
  // --------------------------------------------*/
  // constructor(private modalService: NgbModal) {}
     
  // /**
  //  * Write code on Method
  //  *
  //  * @return response()
  //  */
  // open(content:any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // } 
     
  // /**
  //  * Write code on Method
  //  *
  //  * @return response()
  //  */
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

