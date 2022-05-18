import { Component, OnInit } from '@angular/core';
import { Boek } from './boek';
import { boekService } from './boekenlijst.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ExemplaarService } from '../exemplaar/exemplaar.service';
import { Exemplaar } from '../reserveringen/exemplaar';
import { reserveringService } from '../reserveringen/reserveringen.service';
import { StatusHistory } from '../reserveringen/statushistory';
import { CurrentUserService } from '../service/current-user.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import * as icons from '@fortawesome/free-solid-svg-icons/'
import { faBookMedical,faBoxArchive, faBookOpenReader  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boekenlijst',
  templateUrl: './boekenlijst.component.html',
  styleUrls: ['./boekenlijst.component.css'],
})
export class BoekenlijstComponent implements OnInit {
  faBookMedical = faBookMedical;
  faBoxArchive = faBoxArchive;
  faBookOpenReader = faBookOpenReader;
  public reserveringen: StatusHistory[] = [];
  public boeken!: Boek[];
  public exemplaren!: Boek[];
  public editBoek: Boek | undefined;
  public editBoek2: Boek | undefined;
  public reservedBoek: Boek | undefined;
  public isReservedBoek: Boek | undefined;
  public archivedBoek: Boek | undefined;
  public deleteBoek: Boek | undefined;
  public bibliotheekBoek: Boek | undefined;
  public beschikbaarheidBoek: Boek | undefined;
  public boekBeschikbaar: boolean = true;
  public currentUser: any;
  maxAvailable!: number;
  minAvailable: number = 0;
  maxCopies: number = 30;
  minCopies: number = 5;
  isAdmin = false;
  archive = false;
  // reserved = false;

  constructor(private boekService: boekService,
              private exemplaarService: ExemplaarService,
              private reserveringService: reserveringService,
              private CurrentUserService: CurrentUserService,
              private tokenStorageService: TokenStorageService,
              private router: Router
              ) {}

  public getBoeken(): void {
    this.boekService.getBoeken().subscribe(
      (response: Boek[]) => {
        this.boeken = response;
        for (var i = 0; i < this.boeken.length; i++) {
          if (this.boeken[i].available == 0 && this.boeken[i].copies == 0) {
            this.boeken[i].copies = Math.floor(Math.random() * (this.maxCopies - this.minCopies + 1)) + this.minCopies;
            // this.maxAvailable = this.boeken[i].copies;
            this.boeken[i].available = this.boeken[i].copies;
            this.boekService.updateBoek(this.boeken[i]).subscribe(
            (response: Boek) => {
              this.getBoeken();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      }},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getReserveringen();
    this.getBoeken();
    this.CurrentUserService.getCurrentUser();
    this.currentUser = this.CurrentUserService.currentUser;

    this.isAdmin = !!this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN');
  }

  public getReserveringen(): void {
    this.reserveringService.getReserveringen().subscribe(
      (response: StatusHistory[]) => {
        this.reserveringen = response;
        
        for (var i = 0; i < this.reserveringen.length; i++) {
          if (this.reserveringen[i].user.id == this.currentUser.id) {
          } else {}
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public onAddBoek(addForm: NgForm): void {
    document.getElementById('add-boek-form')?.click();
    this.boekService.addBoek(addForm.value).subscribe(
      (response: Boek) => {
        this.getBoeken();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getArchive(): boolean {
    if (this.archive) {
      this.archive = false;
    } else {
      this.archive = true}
    return this.archive;
  }

  public isReserved(boek: Boek): boolean {

    this.isReservedBoek = boek;
    var reserved = false;
        for (var i = 0; i < this.reserveringen.length; i++) {
          if (this.reserveringen[i].user.id == this.currentUser.id && this.isReservedBoek?.id == this.reserveringen[i].exemplaar.boek.id) {
              reserved = true;
          }
        }
    
    return reserved;
  } 

  public archived(boek: Boek): boolean {
    this.reservedBoek = boek;
    var archived = false;
    for (var i = 0; i < this.boeken.length; i++) {
      if (this.reservedBoek.status == 'ARCHIVED' ) {
      
          archived = true;
      }
    }
    return archived;
  }

  public setReserved(boek: Boek): void {
    this.editBoek2 = boek
    if (this.editBoek2.available > 0) {
      this.editBoek2.available--;

      this.exemplaarService.getExemplarenBybookId(this.editBoek2.id).subscribe(
        (response: Exemplaar[]) => {
          for (var exemplaar of response) {
            if (exemplaar.staat === "beschikbaar") {
              let resObj = {
                admin_modif: false,
                active: true,
                status: "gereserveerd"}
              var reserveringJson = JSON.stringify(resObj);
              this.reserveringService.goedkeurReservering(reserveringJson, this.currentUser.id , exemplaar.id).subscribe(
                (response: StatusHistory) => {

                  this.boekService.updateBoek(this.editBoek2!).subscribe(
                    (response: Boek) => {
                      this.getBoeken();
                      this.getReserveringen();
                    },
                    (error: HttpErrorResponse) => {
                      alert(error.message);
                    }
                  );

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
  }

  public onUpdateBoek(boek: Boek): void {
    this.boekService.updateBoek(boek).subscribe(
      (response: Boek) => {
        this.getBoeken();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onArchivedBoek(boek: Boek): void {
    this.archivedBoek!.status = 'ARCHIVED';
    this.boekService.updateBoek(this.archivedBoek!).subscribe(
      (response: Boek) => {
        this.getBoeken();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBoek(boek: Boek): void {
    this.boekService.deleteBoek(this.deleteBoek!.id).subscribe(
      (response: void) => {
        this.getBoeken();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onBibliotheekBoek(boek: Boek): void {
    this.bibliotheekBoek!.status = 'BIBLIOTHEEK';
    this.boekService.updateBoek(this.bibliotheekBoek!).subscribe(
      (response: Boek) => {
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
    if (mode === 'archive') {
      this.archivedBoek = boek;
      button.setAttribute('data-target', '#archiveBoekModal');
    }
    if (mode === 'bibliotheek') {
      this.bibliotheekBoek = boek;
      button.setAttribute('data-target', '#libraryBoekModal');
    }
    if (mode === 'delete') {
      this.deleteBoek = boek;
      button.setAttribute('data-target', '#deleteBoekModal');
    }
    container?.appendChild(button);
    button.click();
  }


  public onOpenModal2(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#okkBoekModal');
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal1(boek : Boek): void {
    this.editBoek = boek;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#deleteeBoekModal');
    container?.appendChild(button);
    button.click();
  }
}

