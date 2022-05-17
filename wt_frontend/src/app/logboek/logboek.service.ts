import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusHistory } from '../reserveringen/statushistory';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class logboekService {
  private apiServerUrl = environment.apiBaseurl;

  constructor(private http: HttpClient) {}

  public getLogboek(): Observable<StatusHistory[]> {
    return this.http.get<StatusHistory[]>(
      `${this.apiServerUrl}/statushistorie/all`
    );
  }

  public getBoekenUser(user_id: number): Observable<StatusHistory[]> {
    return this.http.get<StatusHistory[]>(
      `${this.apiServerUrl}/statushistorie/find/user/${user_id}`
    );
  }
}
