import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../service/user';
import { UserDataService } from '../service/user-data.service';
import { TokenStorageService } from '../service/token-storage.service';
import { logboekService } from '../logboek/logboek.service';
import { faUserPlus,faBoxArchive, faUsers } from '@fortawesome/free-solid-svg-icons';
import { StatusHistory } from '../reserveringen/statushistory';

@Component({
  selector: 'app-useraccounts',
  templateUrl: './useraccounts.component.html',
  styleUrls: ['./useraccounts.component.css']
})

export class UseraccountsComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  public users!: User[];
  public archivedUsers!: User[];
  public activeUsers!: User[];
  public updateUser: User | undefined;
  public deleteUser: User | undefined;
  public archiveUser: User | undefined;
  public currentUser: User | undefined;
  public userlijstUser: User | undefined;
  username?: string;
  name?: string;
  faUserPlus = faUserPlus;
  faBoxArchive = faBoxArchive;
  faUsers = faUsers;
  public archive: boolean | undefined;
  public currentboekenActief: StatusHistory[] | undefined;
  
  constructor(private uds : UserDataService, 
              private tokenStorageService: TokenStorageService,
              private logboekService: logboekService) { }

  ngOnInit() {
    this.getUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
      this.name = user.name;
      this.archive = false;
    }
  }

  public getUsers() : void {
    this.uds.getUsers().subscribe(
      (response : User[]) => {
        this.users = response;
        this.archivedUsers = response.filter((item) => item.functie == 'ARCHIVED')
        this.activeUsers = response.filter((item) => item.functie !== 'ARCHIVED')
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  
  public getArchive(): boolean {
    if (this.archive) {
      this.archive = false;
    } else {
      this.archive = true}
    return this.archive;
  }

  public onOpenModal(user:any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addUserModal');
    }if (mode === 'edit'){
      this.updateUser = user;
      button.setAttribute('data-target', '#editUserModal');
    }    
    if (mode === 'archive') {
      this.archiveUser = user;
      button.setAttribute('data-target', '#archiveUserModal');
    }
    if (mode === 'userlijst') {
      this.userlijstUser = user;
      button.setAttribute('data-target', '#userlijstUserModal');
    }    
    if (mode === 'deleteData'){
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteDataUserModal');
    }
    if (mode === 'delete'){
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    if (mode === 'archiveDenied'){
      button.setAttribute('data-target', '#archiveDeniedModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')?.click();
    this.uds.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onArchivedUser(user: User): void {
    this.archiveUser = user;
    this.logboekService.getBoekenUser(this.archiveUser.id).subscribe(
      (response: StatusHistory[]) => {
        this.currentboekenActief = response.filter(
          (item) =>
            item.active &&
            (item.status == 'uitgeleend' || item.status == 'gereserveerd')
        );
        if (this.currentboekenActief.length == 0) {
          this.archiveUser!.functie = 'ARCHIVED';
          this.uds.updateUser(this.archiveUser!).subscribe(
            (response: User) => {
              this.getUsers();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        } 
        else {
          this.onOpenModal(this.archiveUser, "archiveDenied");
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUserlijstUser(user: User): void {
    this.userlijstUser = user;
    this.userlijstUser.functie = '?';
    this.uds.updateUser(this.userlijstUser).subscribe(
      (response: User) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteDataUser(user : User): void {
    this.deleteUser = user;
    this.deleteUser.name = "";
    this.deleteUser.username = "default@wt.nl";    
    this.deleteUser.linkedinURL = "";
    this.deleteUser.photo = "";
    this.deleteUser.phoneNumber = "";
    this.deleteUser.functie = "DELETED"
    this.uds.updateUser(this.deleteUser).subscribe(
      (response: User) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteUser(id : number): void {
    this.uds.deleteUser(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateUser(user: User): void {
    this.uds.updateUser(user).subscribe(
      (response: User) => {
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchUser(key: string): void{
    const results: User[] = [];
    for (const user of this.users!) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  user.functie.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  user.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ) 
      {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      setTimeout('', 5000);
      this.getUsers();
    }
  }

public openURLWindow(url : string): void {
  window.open(url);
}


}

