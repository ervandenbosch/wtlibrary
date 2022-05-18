import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../service/current-user.service';
import { StatusHistory } from '../reserveringen/statushistory';
import { uitgeleendService } from './uitgeleend.service';


@Component({
  selector: 'app-uitgeleend',
  templateUrl: './uitgeleend.component.html',
  styleUrls: ['./uitgeleend.component.css']
})
export class UitgeleendComponent implements OnInit {

  public uitgeleend: StatusHistory[] | undefined;

  constructor(private uitgeleendService: uitgeleendService) { }

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

  public getUitgeleend(): void {
    this.uitgeleendService.getUitgeleend().subscribe(
      (response: StatusHistory[]) => {
        this.uitgeleend = response;
        for (var i = 0; i < this.uitgeleend.length; i++) {
          this.uitgeleend[i].timestamp = this.convertTimestamp(this.uitgeleend[i].timestamp);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  
  public updateStatus(statusHistory: StatusHistory, newStatus: string): void {
    let statusObj = {
      admin_modif: true,
      active: true,
      status: newStatus}

    var statusUpdateJson = JSON.stringify(statusObj);
    this.uitgeleendService.updateStatus(statusUpdateJson, statusHistory.user.id, statusHistory.exemplaar.id).subscribe(
      (response: StatusHistory) => {
        this.getUitgeleend();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getUitgeleend();
  }


}
