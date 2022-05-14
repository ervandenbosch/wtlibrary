import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})

export class LoggedIn implements CanActivate {
  constructor(private token: TokenStorageService, private router: Router) {}

  canActivate() {
    
    if (!!this.token.getToken()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      window.alert("Log in om de site te kunnen bezoeken");
      return false;
    }
  }
}
  
@Injectable({
  providedIn: 'root'
})
export class isAdmin implements CanActivate {
  constructor(private token: TokenStorageService, private router: Router) {}

  canActivate() {
    if (this.token.getUser().roles.includes('ROLE_ADMIN')) {
      return true;
    } else {
      this.router.navigateByUrl('/profielpagina/' + this.token.getUser().id);
      window.alert("Je hebt geen toestemming om deze pagina te bezoeken");
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
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
