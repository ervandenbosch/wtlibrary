import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout, timer } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private HOME_URL = environment.homeURL;

  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string | undefined;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }

    if (this.isLoggedIn) {
      setTimeout(() => {
        this.router.navigate([
          'profielpagina/' + this.tokenStorage.getUser().id,
        ]);
      }, 1000);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.username = this.tokenStorage.getUser().username;
        this.roles = this.tokenStorage.getUser().roles;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    if (this.isLoggedIn) {
      window.location.href = this.HOME_URL;
    }
  }
}
