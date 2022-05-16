import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from './log';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { logboekService } from './logboek.service';
import { StatusHistory } from '../reserveringen/statushistory';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-logboek',
  templateUrl: './logboek.component.html',
  styleUrls: ['./logboek.component.css'],
})
export class LogboekComponent implements OnInit {
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  public currentPage: number = 1;
  public currentSort: string | undefined;

  public currentLogs!: StatusHistory[]; // | undefined;
  public logs: StatusHistory[] | undefined;

  constructor(private logboekService: logboekService) {}

  sortAz() {
    this.logs = this.currentLogs.sort((a, b) => a.exemplaar.boek.title.localeCompare(b.exemplaar.boek.title));

    this.currentSort = 'Titel (A-Z)';
    return this.logs;
  }
  sortZa() {
    this.logs = this.currentLogs.sort((a, b) => b.exemplaar.boek.title.localeCompare(a.exemplaar.boek.title));

    this.currentSort = 'Titel (Z-A)';
    return this.logs;
  }

  sortAzName() {
    this.logs = this.currentLogs.sort((a, b) =>
      a.user.name.localeCompare(b.user.name)
    );

    this.currentSort = 'Persoon (A-Z)';
    return this.logs;
  }
  sortZaName() {
    this.logs = this.currentLogs.sort((a, b) =>
      b.user.name.localeCompare(a.user.name)
    );
    this.currentSort = 'Persoon (Z-A)';
    return this.logs;
  }

  sortDatumDown() {
    this.logs = this.currentLogs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    this.currentSort = 'Datum ∀';
    return this.logs;
  }

  sortDatumUp() {
    this.logs = this.currentLogs.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    this.currentSort = 'Datum ^';
    return this.logs;
  }

  public convertTimestamp(timestamp: string) {
    var date = new Date(timestamp);
    var newTimestamp = [([
        ("0" + date.getDate()).slice(-2),
        ("0" + (date.getMonth()+1)).slice(-2),
        date.getFullYear()
      ].join('/')), ([
        ("0" + date.getHours()).slice(-2),
        ("0" + date.getMinutes()).slice(-2)
      ].join(':'))
      ].join(" ");
    return newTimestamp
  }

  getLogs(): void {
    this.logboekService.getLogboek().subscribe(
      (response: StatusHistory[]) => {
        this.currentLogs = response;
        this.logs = response;
        for (var i = 0; i < this.currentLogs.length; i++) {
          this.currentLogs[i].timestamp = this.convertTimestamp(this.currentLogs[i].timestamp);
        }
        this.sortDatumDown();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )    
  }

  first100() {
    this.logs = this.currentLogs.slice(0, 99);
    this.currentPage = 1;
  }

  first200() {
    if (this.currentLogs.length > 200) {
      this.logs = this.currentLogs.slice(1, 199);
      this.currentPage = 2;
    }
  }

  first300() {
    if (this.currentLogs.length > 300) {
      this.logs = this.currentLogs.slice(2, 299);
      this.currentPage = 3;
    }
  }

  first400() {
    if (this.currentLogs.length > 400) {
      this.logs = this.currentLogs.slice(3, 399);
      this.currentPage = 4;
    }
  }

  back() {
    if (this.currentPage > 1 && this.currentLogs.length > 99) {
      this.currentPage = this.currentPage - 1;
      this.logs = this.currentLogs.slice(
        this.currentPage,
        this.currentPage * 100 + 99
      );
    }
  }
  next() {
    if (
      this.currentPage > 0 &&
      this.currentPage < 4 &&
      this.currentLogs.length > 99
    ) {
      this.currentPage = this.currentPage + 1;
      this.logs = this.currentLogs.slice(
        this.currentPage,
        this.currentPage * 100 + 99
      );
    }
  }

  public searchLogs(key: string): void {
    const results: StatusHistory[] = [];
    for (const log of this.logs!) {
      if (
        log.exemplaar.boek.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.exemplaar.boek.authors.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.exemplaar.boek.categories.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.timestamp.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.status.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(log);
      }
    }
    this.logs = results;
    if (results.length === 0 || !key) {
      this.getLogs();
    }
  }

  ngOnInit(): void {
    this.getLogs();

    // console.log(this.currentSort);
    // console.log(this.currentPage);
  }
}
