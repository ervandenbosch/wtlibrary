import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from './log';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

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
  public currentLogs: Log[] = [
    {
      id: 1,
      title: 'Harry Potter',
      thumbnailUrl:
        'https://secure.img2-fg.wfcdn.com/im/96449558/resize-h800-w800%5Ecompr-r85/4049/40493777/Harry+Potter+%2527Book+Cover+-+Deathly+Hallows%2527+Graphic+Art+Print.jpg',
      authors: 'J.K. Rowling',
      categories: 'fiction',
      date: '25-03-2021',
      namelender: 'Ezra',
      exemplaar: 3,
      isbn: 'ee32r23r23r',
      status: 'Toevoeging',
    },
    {
      id: 2,
      title: 'Barry Pooter',
      thumbnailUrl:
        'https://secure.img2-fg.wfcdn.com/im/96449558/resize-h800-w800%5Ecompr-r85/4049/40493777/Harry+Potter+%2527Book+Cover+-+Deathly+Hallows%2527+Graphic+Art+Print.jpg',
      authors: 'J.K. Rowling',
      categories: 'fiction',
      date: '24-03-2021',
      namelender: 'Tako',
      exemplaar: 3,
      isbn: 'e3e23e23',
      status: 'Reservering',
    },
    {
      id: 3,
      title: 'Larry Boter',
      thumbnailUrl:
        'https://secure.img2-fg.wfcdn.com/im/96449558/resize-h800-w800%5Ecompr-r85/4049/40493777/Harry+Potter+%2527Book+Cover+-+Deathly+Hallows%2527+Graphic+Art+Print.jpg',
      authors: 'J.K. Howling',
      categories: 'Non-fictie',
      date: '24-04-2021',
      namelender: 'Martijn',
      exemplaar: 2,
      isbn: 'e3e23e23',
      status: 'Reservering',
    },
  ];

  public logs: Log[] | undefined;

  constructor() {}

  sortAz() {
    this.logs = this.currentLogs.sort((a, b) => a.title.localeCompare(b.title));

    this.currentSort = 'Titel (A-Z)';
    return this.logs;
  }
  sortZa() {
    this.logs = this.currentLogs.sort((a, b) => b.title.localeCompare(a.title));

    this.currentSort = 'Titel (Z-A)';
    return this.logs;
  }

  sortAzName() {
    this.logs = this.currentLogs.sort((a, b) =>
      a.namelender.localeCompare(b.namelender)
    );

    this.currentSort = 'Persoon (A-Z)';
    return this.logs;
  }
  sortZaName() {
    this.logs = this.currentLogs.sort((a, b) =>
      b.namelender.localeCompare(a.namelender)
    );
    this.currentSort = 'Persoon (Z-A)';
    return this.logs;
  }

  sortDatumDown() {
    this.logs = this.currentLogs.sort((a, b) => b.date.localeCompare(a.date));
    this.currentSort = 'Datum ∀';
    return this.logs;
  }

  sortDatumUp() {
    this.logs = this.currentLogs.sort((a, b) => a.date.localeCompare(b.date));
    this.currentSort = 'Datum ^';
    return this.logs;
  }

  getLogs() {
    this.logs = this.currentLogs;
    return this.logs;
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
    const results: Log[] = [];
    for (const log of this.logs!) {
      if (
        log.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.authors.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.categories.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.namelender.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        log.date.toLowerCase().indexOf(key.toLowerCase()) !== -1
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
    this.sortDatumDown();

    console.log(this.currentSort);
    console.log(this.currentPage);
  }
}
