import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { User } from '../service/user';
import { UserDataService } from '../service/user-data.service';
import { Boek } from '../boekenlijst/boek';
import { boekService } from '../boekenlijst/boekenlijst.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profielpagina',
  templateUrl: './profielpagina.component.html',
  styleUrls: ['./profielpagina.component.css'],
})
export class ProfielpaginaComponent implements OnInit {
  public users: User[] | undefined;
  public currentUser: User | undefined;
  public editUser: User | undefined;
  public addUser: User | undefined;
  public deleteUser: User | undefined;
  public boeken: Boek[] | undefined;
  public editBoek: Boek | undefined;
  public deleteBoek: Boek | undefined;
  public currentUserId: number | undefined;

  constructor(
    private modalService: NgbModal,
    private UserDataService: UserDataService,
    private boekService: boekService,
    private route: ActivatedRoute
  ) {}

  open(content: any) {
    this.modalService.open(content, { size: 'md' });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('the id of this route is: ', params['id']);
      this.currentUserId = params['id'] - 1;
    });
    this.getUsers();
    this.getBooks();
  }

  public getUsers() {
    this.UserDataService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
        if (this.currentUserId) {
          this.currentUser = this.users[this.currentUserId];
        } else {
          this.currentUser = this.users[0];
        }
        this.editUser = this.currentUser;
        console.log(this.currentUser);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getBooks() {
    this.boekService.getBoeken().subscribe(
      (response: Boek[]) => {
        this.boeken = response;
        console.log(this.boeken);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditUser(user: User) {
    this.UserDataService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
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
        console.log(response);
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
        console.log(response);
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
