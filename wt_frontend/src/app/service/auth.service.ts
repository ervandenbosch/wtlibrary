import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LoggedIn implements CanActivate {
  constructor(private token: TokenStorageService) {}

  canActivate() {
    
    if (!!this.token.getToken()) {
      return true;
    } else {
      window.alert("Je hebt geen toestemming om deze pagina te bekijken");
      return false;
    }
  }
}
  
@Injectable({
  providedIn: 'root'
})
export class isAdmin implements CanActivate {
  constructor(private token: TokenStorageService) {}

  canActivate() {
    if (this.token.getUser().roles.includes('ROLE_ADMIN')) {
      return true;
    } else {
      window.alert("Je hebt geen toestemming om deze pagina te bekijken");
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(name: string, username: string, email: string, password: string, phoneNumber: string, functie: string, photo: string, linkedinURL: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name,
      username,
      email,
      password,
      phoneNumber,
      functie,
      photo,
      linkedinURL
    }, httpOptions);
  }
}
