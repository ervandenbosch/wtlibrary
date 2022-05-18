import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isDefined } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ExemplaarService } from '../exemplaar/exemplaar.service';
import { logboekService } from '../logboek/logboek.service';
import { Exemplaar } from '../reserveringen/exemplaar';
import { StatusHistory } from '../reserveringen/statushistory';
import { CurrentUserService } from '../service/current-user.service';
import { User } from '../service/user';
import { UserDataService } from '../service/user-data.service';
import { boekService } from '../boekenlijst/boekenlijst.service';
import { Boek } from '../boekenlijst/boek';


@Component({
  selector: 'app-exemplaren',
  templateUrl: './exemplaren.component.html',
  styleUrls: ['./exemplaren.component.css']
})
export class ExemplarenComponent implements OnInit {

  public exemplaren: Exemplaar[] | undefined;
  public currentExemplaren!: Exemplaar[];
  public currentUser: any;
  public currentExemplaar!: Exemplaar;// | undefined;
  public users: User[] | undefined;
  public pickedUser!: User;// | undefined;
  public currentSort: string | undefined;  
  public currentPage: number = 1;
  public currentStatus: string | undefined;

  constructor(private exemplaarService: ExemplaarService,
              private logboekService: logboekService,
              private CurrentUserService: CurrentUserService,
              private userDataService : UserDataService,
              private boekService : boekService) { }

  public getExemplaren(): void {
    this.exemplaarService.getExemplaren().subscribe(
      (response: Exemplaar[]) => {
        this.exemplaren = response;
        this.currentExemplaren = response;
        this.sortAz();
        this.currentStatus = "alle exemplaren";
        this.first100();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getUsers(): void {
    this.userDataService.getUsers().subscribe(
      (response : User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchExemplaren(key: string): void {
    const results: Exemplaar[] = [];
    for (const exemplaar of this.exemplaren!) {
      if (
        exemplaar.boek.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        exemplaar.boek.authors.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        exemplaar.boek.categories.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        exemplaar.id.toString().indexOf(key.toLowerCase()) !== -1 ||
        exemplaar.staat.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(exemplaar);
      }
    }
    this.exemplaren = results;
    if (results.length === 0 || !key) {
      this.getExemplaren();
    }
  }

  filterStatus(status: string): void {
    this.currentStatus = status;
    this.exemplaren = this.currentExemplaren;
    if (status !== 'alle exemplaren') {
      this.searchExemplaren(status);
    }
    else {
      this.exemplaren = this.currentExemplaren;
    }
  }  

  sortAz() {
    this.exemplaren = this.currentExemplaren.sort((a, b) => a.boek.title.localeCompare(b.boek.title));
    this.currentSort = 'Titel (A-Z)';
    return this.exemplaren;
  }

  first100() {
    this.exemplaren = this.currentExemplaren.slice(0, 99);
    this.currentPage = 1;
  }

  first200() {
    if (this.currentExemplaren.length > 200) {
      this.exemplaren = this.currentExemplaren.slice(100, 199);
      this.currentPage = 2;
    }
  }

  first300() {
    if (this.currentExemplaren.length > 300) {
      this.exemplaren = this.currentExemplaren.slice(200, 299);
      this.currentPage = 3;
    }
  }

  first400() {
    if (this.currentExemplaren.length > 400) {
      this.exemplaren = this.currentExemplaren.slice(300, 399);
      this.currentPage = 4;
    }
  }

  back() {
    if (this.currentPage > 1 && this.currentExemplaren.length > 99) {
      this.currentPage = this.currentPage - 1;
      this.exemplaren = this.currentExemplaren.slice(
        this.currentPage,
        this.currentPage * 100 + 99
      );
    }
  }
  next() {
    if (
      this.currentPage > 0 &&
      this.currentPage < 4 &&
      this.currentExemplaren.length > 99
    ) {
      this.currentPage = this.currentPage + 1;
      this.exemplaren = this.currentExemplaren.slice(
        this.currentPage,
        this.currentPage * 100 + 99
      );
    }
  }

  public openUserPickModal(exemplaar: Exemplaar, newStatus: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.currentExemplaar = exemplaar;

    button.setAttribute('data-target', '#userPickModal');
    container?.appendChild(button);
    button.click();

  }

  public setUser(user: User): void{ 
    this.pickedUser = user;
  }

  public uitlenen(): void { 
    let statusObj = {
      admin_modif: true,
      active: true,
      status: 'uitgeleend'}
    var statusUpdateJson = JSON.stringify(statusObj);
    this.logboekService.updateStatus(statusUpdateJson, this.pickedUser.id, this.currentExemplaar.id).subscribe(
      (response: StatusHistory) => {
        console.log(response);
        this.getExemplaren();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.currentExemplaar.boek.available = this.currentExemplaar.boek.available - 1;
    this.boekService.updateBoek(this.currentExemplaar.boek).subscribe(
      (response: Boek) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateStatus(exemplaar: Exemplaar, newStatus: string): void {
    let statusObj = {
      admin_modif: true,
      active: true,
      status: newStatus}
    
    this.currentExemplaar = exemplaar;
    var statusUpdateJson = JSON.stringify(statusObj);
    console.log(statusUpdateJson);
    this.logboekService.updateStatus(statusUpdateJson, this.currentUser.id, this.currentExemplaar.id).subscribe(
      (response: StatusHistory) => {
        console.log(response);
        this.getExemplaren();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    if (newStatus == "beschikbaar") {
      this.currentExemplaar.boek.available = this.currentExemplaar.boek.available + 1;
      this.boekService.updateBoek(this.currentExemplaar.boek).subscribe(
        (response: Boek) => {
          alert("boek is geupdate");
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    else if (newStatus == "beschadigd" || newStatus == "kwijt") {
      this.currentExemplaar.boek.available = this.currentExemplaar.boek.available - 1;
      this.boekService.updateBoek(this.currentExemplaar.boek).subscribe(
        (response: Boek) => {
          alert("boek is geupdate");
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getExemplaren();        
    this.getUsers();
    this.CurrentUserService.getCurrentUser();
    this.currentUser = this.CurrentUserService.currentUser;
  }
}
