import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { CurrentUserService } from '../service/current-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  roles: string[] = [];
  
  isLoggedIn = false;
  isAdmin = false;
  username?: string;
  name?: string;
  email?: string;
  id?: number;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

    if (!!this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN') || this.tokenStorageService.getUser().userRole == 'admin') {
      this.isAdmin = true;
    }
      this.username = user.username;
      this.name = user.name;
      this.email = user.email;
      this.id = user.id;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
