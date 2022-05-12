import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public currentUser: any;
  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  id?: number;
  username?: string;
  name?: string
  email?: string
  roles?: string[]
  photo?: string;
  functie?: string;
  phoneNumber?: string;
  linkedinURL?: string;

  constructor(private token: TokenStorageService) { }

  public getCurrentUser () {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.roles = this.currentUser.roles;

      if (this.roles?.includes('ROLE_ADMIN')){
        
      } else {}

      this.id          = this.currentUser.id;
      this.username    = this.currentUser.username;
      this.name        = this.currentUser.name;
      this.email       = this.currentUser.email;
      this.roles       = this.currentUser.roles;
      this.photo       = this.currentUser.photo;
      this.functie     = this.currentUser.functie;
      this.phoneNumber = this.currentUser.phoneNumber;
      this.linkedinURL = this.currentUser.linkedinURL;  
    }
  }
}
