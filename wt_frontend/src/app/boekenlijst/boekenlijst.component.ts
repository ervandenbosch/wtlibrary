import { Component, OnInit } from '@angular/core';
import { Boek } from './boek';
import { boekService } from './boekenlijst.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ExemplaarService } from '../exemplaar/exemplaar.service';
import { Exemplaar } from '../exemplaar/exemplaar';
import { reserveringService } from '../reserveringen/reserveringen.service';
import { StatusHistory } from '../reserveringen/statushistory';
import { CurrentUserService } from '../service/current-user.service';

@Component({
  selector: 'app-boekenlijst',
  templateUrl: './boekenlijst.component.html',
  styleUrls: ['./boekenlijst.component.css'],
})
export class BoekenlijstComponent implements OnInit {
  public boeken: Boek[] | undefined;
  public editBoek: Boek | undefined;
  public deleteBoek: Boek | undefined;
  public boekBeschikbaar: boolean = true;
  public currentUser: any;

  constructor(private boekService: boekService,
              private exemplaarService: ExemplaarService,
              private reserveringService: reserveringService,
              private CurrentUserService: CurrentUserService
              ) {}

  public getBoeken(): void {
    this.boekService.getBoeken().subscribe(
      (response: Boek[]) => {
        this.boeken = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit() {
    this.getBoeken();
    this.CurrentUserService.getCurrentUser();
    this.currentUser = this.CurrentUserService.currentUser;
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
    );
  }

  public setReserved(boek: Boek): void {
    if (boek.available > 0) {
      boek.available--;

      this.exemplaarService.getExemplarenBybookId(boek.id).subscribe(
        (response: Exemplaar[]) => {
          console.log(response)
          for (var exemplaar of response) {
            if (exemplaar.staat === "beschikbaar") {
              console.log(exemplaar)
              let resObj = {
                admin_modif: false,
                active: true,
                status: "gereserveerd"}
              var reserveringJson = JSON.stringify(resObj);
              this.reserveringService.goedkeurReservering(reserveringJson, this.currentUser.id , exemplaar.id).subscribe(
                (response: StatusHistory) => {
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
              );
              break
            }
          }
        }
        ,
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else (boek.available = 0);
    
    this.boekService.updateBoek(boek).subscribe(
      (response: Boek) => {
        console.log(response);
        this.getBoeken();
        if (boek.available == 0) {this.boekBeschikbaar = false};
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
    );
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
    );
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

  public searchBoek(key: string): void {
    const results: Boek[] = [];
    for (const boek of this.boeken!) {
      if (
        boek.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        boek.authors.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        boek.isbn.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        boek.categories.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        boek.categories.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
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
