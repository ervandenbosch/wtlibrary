import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../service/user';
import { UserDataService } from '../service/user-data.service';
import { TokenStorageService } from '../service/token-storage.service';


@Component({
  selector: 'app-useraccounts',
  templateUrl: './useraccounts.component.html',
  styleUrls: ['./useraccounts.component.css']
})

export class UseraccountsComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  public users: User[] | undefined;
  public updateUser: User | undefined;
  public deleteUser: User | undefined;
  username?: string;
  name?: string;

  
  constructor(private uds : UserDataService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.getUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
      this.name = user.name;
    }
  }

  public getUsers() : void {
    this.uds.getUsers().subscribe(
      (response : User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
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
    if (mode === 'delete'){
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
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

