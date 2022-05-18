import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    username: null,
    email: null,
    password: null,
    phoneNumber: null,
    functie: null,
    photo: null,
    linkedinURL: null,
    userRole: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isAdmin = false;
  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (!!this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN') || this.tokenStorageService.getUser().userRole == 'admin') {
      this.isAdmin = true;
    }
  }

  onSubmit(): void {
    const { name, email, password, phoneNumber, functie, photo, linkedinURL, userRole} = this.form;
    const checkbox = document.getElementById('userRole',
    ) as HTMLInputElement | null;
    this.authService.register(name, email, email, password, phoneNumber, functie, photo, linkedinURL, userRole).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
