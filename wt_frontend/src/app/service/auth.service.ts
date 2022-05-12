import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API = environment.authURL;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.AUTH_API}/signin`,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(
    name: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    functie: string,
    photo: string,
    linkedinURL: string
  ): Observable<any> {
    return this.http.post(
      `${this.AUTH_API}/signup`,
      {
        name,
        username,
        email,
        password,
        phoneNumber,
        functie,
        photo,
        linkedinURL,
      },
      httpOptions
    );
  }
}
