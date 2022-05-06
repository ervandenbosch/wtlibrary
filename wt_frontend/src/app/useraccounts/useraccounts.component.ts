import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAccountsService } from './useraccounts.service';
import { UserBeta } from './userbeta';

@Component({
  selector: 'app-useraccounts',
  templateUrl: './useraccounts.component.html',
  styleUrls: ['./useraccounts.component.css']
})

export class UseraccountsComponent implements OnInit {

  public users: UserBeta[] | undefined;
  public updateUser: UserBeta | undefined;
  public deleteUser: UserBeta | undefined;

  
  constructor(private uas : UserAccountsService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() : void {
    this.uas.getUseracounts().subscribe(
      (response : UserBeta[]) => {
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
    this.uas.addUser(addForm.value).subscribe(
      (response: UserBeta) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteUser(userID: number): void {
    this.uas.deleteUser(userID).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
 

  public onUpdateUser(user: UserBeta): void {
    this.uas.updateUser(user).subscribe(
      (response: UserBeta) => {
        console.log(response);
        console.log(user);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchUser(key: string): void{
    const results: UserBeta[] = [];
    for (const user of this.users!) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  user.function.toLowerCase().indexOf(key.toLowerCase()) !== -1 
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

}

