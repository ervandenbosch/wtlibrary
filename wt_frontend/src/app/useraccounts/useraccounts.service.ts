import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserBeta } from './userbeta';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UserAccountsService {
  private apiServerUrl = environment.apiBaseurl;

  constructor(private http: HttpClient){}

  public getUseracounts(): Observable<any> {
    return this.http.get<UserBeta[]>(`${this.apiServerUrl}/user/userlist`);
  }

  public addUser(user: UserBeta): Observable<UserBeta> {
    return this.http.post<UserBeta>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUser(user: UserBeta): Observable<UserBeta> {
    return this.http.put<UserBeta>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }
}