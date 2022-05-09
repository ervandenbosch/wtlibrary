import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 
import { CategoriesService } from './categories.service';
import { Category } from './category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  catName1 = 'categorie 1' //temp data voor testen
  i = 3 //temp id voor temp add functie
  buttonOn = false //voor popup
  public categories: Category[];
  public category: Category;
  //constructor() { }
  
  constructor(private categoriesService: CategoriesService) { }

  public getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
  });
  }

  public addCategory(): void {
    this.categoriesService.addCategories(null).subscribe({
      next: (response: Category) => {
        this.category = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
  });
  }

  public updateCategory(id: number): void {
    this.categoriesService.updateCategories(id).subscribe({
      next: (response: Category) => {
        this.category = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
  });
  }

  public deleteCategory(id: number): void {
    this.categoriesService.deleteCategories(id).subscribe({
      next: (response: Category) => {
        this.category = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
  });
  }

  // public getCategory(cat_name: String): void {
  //   this.categoriesService.getCategory(cat_name).subscribe({
  //     next: (response: Category[]) => {
  //       this.categories = response;
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log(error.message);
  //     }
  // });
  //}

  ngOnInit(): void {
    this.getCategories();
  }


  changeCat(){ //tweede stap voor aanpassen category; confirmation (to be added)
    var popup: HTMLElement = <HTMLElement> document.getElementById("myPopup");
    if (this.buttonOn){
      popup.style.display = 'none';
      this.buttonOn = false;
    }

    
  }

  addCat(){ //(mogelijk temp) functie voor toevoegen category
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    row.id = this.i.toString()
    cell1.innerHTML = `<td><textarea style="width: 100%; resize: none; border: none;" (keydown.enter)="popUp()">` + this.i + `</textarea></td>`;
    cell2.innerHTML = `<td><textarea style="width: 100%; resize: none; border: none;" (keydown.enter)="popUp()">info `  + this.i + `</textarea></td>`;
    cell3.innerHTML = `<td><button class="btn btn-light" style="display: block; margin: auto;"  (click)="delCat(` + row.id + `)">Verwijder</button></td>`;
    this.i++

  }

  delCat(rowid: number){ //temp functie voor verwijderen row
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable");
    var row: HTMLElement = <HTMLElement> document.getElementById(rowid.toString());
    row.remove()
  }

  popUp() { //Rename!!!; eerste stap voor aanpassen category; roept popup op
    var popup: HTMLElement = <HTMLElement> document.getElementById("myPopup");

    if(!this.buttonOn){
      popup.innerHTML = `<p>Weet je het zeker? <button (click)="changeCat()">Bevestig</button></p>`
      popup.style.display = 'initial';
      this.buttonOn = true;
    }
    else {
      popup.style.display = 'none';
      this.buttonOn = false;
    }
  }

}
