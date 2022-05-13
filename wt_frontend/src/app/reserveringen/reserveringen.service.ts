import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusHistory } from './statushistory';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class reserveringService {
  private apiServerUrl = environment.apiBaseurl;

  constructor(private http: HttpClient) {}

  public getReserveringen(): Observable<StatusHistory[]> {
    return this.http.get<StatusHistory[]>(
      `${this.apiServerUrl}/statushistorie/find/status/gereserveerd/1`
    );
  }

  public goedkeurReservering(
    reserveringJson: any,
    user_id: number,
    exemplaar_id: number
  ): Observable<StatusHistory> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Cache-Control': 'no-cache'
    });
    return this.http.post<StatusHistory>(
      `${this.apiServerUrl}/statushistorie/add/user/${user_id}/exemplaar/${exemplaar_id}`,
      reserveringJson,
      { headers: httpHeaders }
    );
  }
}
