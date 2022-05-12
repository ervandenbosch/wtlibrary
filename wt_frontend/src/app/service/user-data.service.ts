import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

    
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/user/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/user/update/`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/user/delete/${userId}`);
  }
}
