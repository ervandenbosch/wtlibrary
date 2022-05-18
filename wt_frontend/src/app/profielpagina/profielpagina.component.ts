import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { User } from '../service/user';
import { UserDataService } from '../service/user-data.service';
import { Boek } from '../boekenlijst/boek';
import { boekService } from '../boekenlijst/boekenlijst.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { CurrentUserService } from '../service/current-user.service';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { logboekService } from '../logboek/logboek.service';
import { StatusHistory } from '../reserveringen/statushistory';

@Component({
  selector: 'app-profielpagina',
  templateUrl: './profielpagina.component.html',
  styleUrls: ['./profielpagina.component.css'],
})
export class ProfielpaginaComponent implements OnInit {
  public users: User[] | undefined;
  public currentUser: any;
  public editUser: User | undefined;
  public addUser: User | undefined;
  public deleteUser: User | undefined;
  public boeken: Boek[] | undefined;
  public currentboekenActief: StatusHistory[] | undefined;
  public boekenActief: StatusHistory[] | undefined;
  public currentboekenVroeger: StatusHistory[] | undefined;
  public boekenVroeger: StatusHistory[] | undefined;
  public editBoek: Boek | undefined;
  public deleteBoek: Boek | undefined;
  public currentUserId: number | undefined;
  public moreBoeken: boolean | undefined;
  public moreHistory: boolean | undefined;

  isLoggedIn = false;
  username?: string;
  adminIsChecked = false;
  isAdmin = false;
  profileOfCurrentUser = false;
  userIsAdmin = false;
  id?: number;
  name?: string;
  email?: string;
  roles?: any;
  photo?: string;
  functie?: string;
  phoneNumber?: string;
  linkedinURL?: string;

  constructor(
    private modalService: NgbModal,
    private UserDataService: UserDataService,
    private boekService: boekService,
    private router: Router,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private CurrentUserService: CurrentUserService,
    private TokenStorageService: TokenStorageService,
    private logboekService: logboekService,
    private userDataService: UserDataService
  ) {}

  open(content: any) {
    this.modalService.open(content, { size: 'md' });
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.currentUser = this.TokenStorageService.getUser();
    this.getBooks();
    this.getBoekenUser();
    this.getUser();
    this.isCurrentUser();

    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.roles = this.currentUser.roles;

    }

    if (!!this.token.getUser().roles.includes('ROLE_ADMIN') || this.token.getUser().userRole == 'admin') {
      this.isAdmin = true;
    }
  }

  public getUsers() {
    this.UserDataService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public isCurrentUser(): void{
    if (
      this.route.snapshot.params['id'] == this.currentUser.id) {
      this.profileOfCurrentUser = true;
    } else {this.profileOfCurrentUser = false;}
  }

  public getUser(): void {
    if (
      this.route.snapshot.params['id'] == this.currentUser.id ||
      this.currentUser.roles.includes('ROLE_ADMIN') || this.token.getUser().userRole == 'admin'
    ) {
      this.UserDataService.getUser(this.route.snapshot.params['id']).subscribe(
        (response: User) => {
          this.editUser = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      window.alert('Je hebt geen toestemming om deze gebruiker te bekijken');
      this.router.navigate(['/profielpagina/' + this.currentUser.id]);
    }
  }

  public getBoekenUser() {
    this.logboekService
      .getBoekenUser(this.route.snapshot.params['id'])
      .subscribe(
        (response: StatusHistory[]) => {
          this.boekenActief = response.filter(
            (item) =>
              item.active &&
              (item.status == 'uitgeleend' || item.status == 'gereserveerd')
          );
          this.boekenVroeger = response.filter(
            (item) => !item.active && item.status == 'uitgeleend'
          );
          this.currentboekenActief = this.boekenActief.slice(0, 3);
          if (this.boekenActief.length > 3) {
            this.moreBoeken = true;
          }
          if (this.boekenVroeger.length > 3) {
            this.moreHistory = true;
          }
          this.currentboekenVroeger = this.boekenVroeger.slice(0, 3);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public showlog(user:User){
    console.log(user.roles)
    this.roles = user.roles;
    console.log(user)
  }

  public showlog2(user:User){
    console.log(user.roles)
    console.log(user)
  }

  public getBooks() {
    this.boekService.getBoeken().subscribe(
      (response: Boek[]) => {
        this.boeken = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditUser(user: User) {
    const checkbox = document.getElementById('userRole',
    ) as HTMLInputElement | null;
    if (checkbox?.checked) {
      user.userRole = 'admin'
    } else (user.userRole = 'user')

    this.UserDataService.updateUser(user).subscribe(
      (response: User) => {
        this.getUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public editUser2(): void {
    document.getElementById('hidden-button1')?.click();
    document.getElementById('close-modal1')?.click();
    document.getElementById('close-modal2')?.click();
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')?.click();
    this.UserDataService.addUser(addForm.value).subscribe(
      (response: User) => {
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public addUser2(): void {
    document.getElementById('hidden-button2')?.click();
    document.getElementById('close-modal3')?.click();
    document.getElementById('close-modal4')?.click();
  }

  public onAddBoek(addForm: NgForm): void {
    document.getElementById('add-boek-form')?.click();
    this.boekService.addBoek(addForm.value).subscribe(
      (response: Boek) => {
        this.getBooks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addBoek2(): void {
    document.getElementById('hidden-button3')?.click();
    document.getElementById('close-modal5')?.click();
    document.getElementById('close-modal6')?.click();
  }
}
