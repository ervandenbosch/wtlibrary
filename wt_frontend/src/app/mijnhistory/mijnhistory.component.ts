import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Boek } from '../boekenlijst/boek';
import { logboekService } from '../logboek/logboek.service';
import { StatusHistory } from '../reserveringen/statushistory';
import { NgForm } from '@angular/forms';
import { User } from '../service/user';
import { UserDataService } from '../service/user-data.service';
import { boekService } from '../boekenlijst/boekenlijst.service';
import { TokenStorageService } from '../service/token-storage.service';
import { CurrentUserService } from '../service/current-user.service';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mijnhistory',
  templateUrl: './mijnhistory.component.html',
  styleUrls: ['./mijnhistory.component.css'],
})
export class MijnhistoryComponent implements OnInit {
  public boeken: Boek[] | undefined;
  public boekenActief: StatusHistory[] | undefined;
  public currentboekenActief: StatusHistory[] | undefined;
  public boekenVroeger: StatusHistory[] | undefined;
  public currentboekenVroeger: StatusHistory[] = [];
  public currentSort: string | undefined;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  public currentUserId: number | undefined;
  public currentUser: any;
  public editUser: User | undefined;

  constructor(
    private TokenStorageService: TokenStorageService,
    private logboekService: logboekService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.TokenStorageService.getUser();
    this.getBoekenUser();
  }

  sortAz() {
    this.boekenVroeger = this.currentboekenVroeger.sort((a, b) =>
      a.exemplaar.boek.title.localeCompare(b.exemplaar.boek.title)
    );

    this.currentSort = 'Titel (A-Z)';
    return this.boekenVroeger;
  }
  sortZa() {
    this.boekenVroeger = this.currentboekenVroeger.sort((a, b) =>
      b.exemplaar.boek.title.localeCompare(a.exemplaar.boek.title)
    );

    this.currentSort = 'Titel (Z-A)';
    return this.boekenVroeger;
  }

  sortAzName() {
    this.boekenVroeger = this.currentboekenVroeger.sort((a, b) =>
      a.user.name.localeCompare(b.user.name)
    );

    this.currentSort = 'Persoon (A-Z)';
    return this.boekenVroeger;
  }
  sortZaName() {
    this.boekenVroeger = this.currentboekenVroeger.sort((a, b) =>
      b.user.name.localeCompare(a.user.name)
    );
    this.currentSort = 'Persoon (Z-A)';
    return this.boekenVroeger;
  }

  sortDatumDown() {
    this.boekenVroeger = this.currentboekenVroeger.sort((a, b) =>
      b.timestamp.localeCompare(a.timestamp)
    );
    this.currentSort = 'Datum ∀';
    return this.boekenVroeger;
  }

  sortDatumUp() {
    this.boekenVroeger = this.currentboekenVroeger.sort((a, b) =>
      a.timestamp.localeCompare(b.timestamp)
    );
    this.currentSort = 'Datum ^';
    return this.boekenVroeger;
  }

  public convertTimestamp(timestamp: string) {
    var date = new Date(timestamp);
    var newTimestamp = [
      [
        ('0' + date.getDate()).slice(-2),
        ('0' + (date.getMonth() + 1)).slice(-2),
        date.getFullYear(),
      ].join('/'),
      [
        ('0' + date.getHours()).slice(-2),
        ('0' + date.getMinutes()).slice(-2),
      ].join(':'),
    ].join(' ');
    return newTimestamp;
  }

  public Search(key: string): void {
    const results: StatusHistory[] = [];
    for (const boek of this.boekenVroeger!) {
      if (boek.user.name) {
        if (
          boek.exemplaar.boek.title.toLowerCase().indexOf(key.toLowerCase()) !==
            -1 ||
          boek.exemplaar.boek.authors
            .toLowerCase()
            .indexOf(key.toLowerCase()) !== -1 ||
          boek.exemplaar.boek.categories
            .toLowerCase()
            .indexOf(key.toLowerCase()) !== -1 ||
          boek.user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          boek.timestamp.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          boek.status.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
          results.push(boek);
        }
      } else {
        if (
          boek.exemplaar.boek.title.toLowerCase().indexOf(key.toLowerCase()) !==
            -1 ||
          boek.exemplaar.boek.authors
            .toLowerCase()
            .indexOf(key.toLowerCase()) !== -1 ||
          boek.exemplaar.boek.categories
            .toLowerCase()
            .indexOf(key.toLowerCase()) !== -1 ||
          boek.timestamp.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          boek.status.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
          results.push(boek);
        }
      }
    }
    this.boekenVroeger = results;
    if (results.length === 0 || !key) {
      this.getBoekenUser();
    }
  }

  public getBoekenUser() {
    this.logboekService.getBoekenUser(this.currentUser.id).subscribe(
      (response: StatusHistory[]) => {
        this.currentboekenActief = response.filter(
          (item) =>
            item.active &&
            (item.status == 'uitgeleend' || item.status == 'gereserveerd')
        );
        this.currentboekenVroeger = response.filter(
          (item) => !item.active && item.status == 'uitgeleend'
        );
        for (var i = 0; i < this.currentboekenVroeger.length; i++) {
          this.currentboekenVroeger[i].timestamp = this.convertTimestamp(
            this.currentboekenVroeger[i].timestamp
          );
        }
        this.sortDatumDown();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
