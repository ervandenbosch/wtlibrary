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