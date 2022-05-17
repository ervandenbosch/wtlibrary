import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseurl;

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(this.apiServerUrl + '/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.apiServerUrl + '/user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.apiServerUrl + '/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.apiServerUrl + '/admin', {
      responseType: 'text',
    });
  }
}
