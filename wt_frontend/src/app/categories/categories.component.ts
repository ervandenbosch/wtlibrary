import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  catName1 = 'categorie 1' //temp data voor testen
  i = 3 //temp id voor temp add functie
  buttonOn = false //voor popup
  

  constructor() { }

  ngOnInit(): void {
    
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
    cell1.innerHTML = `<td><textarea style="width: 100%; resize: none; border: none;" (keydown.enter)="myFunction()">` + this.i + `</textarea></td>`;
    cell2.innerHTML = `<td><textarea style="width: 100%; resize: none; border: none;" (keydown.enter)="myFunction()">info `  + this.i + `</textarea></td>`;
    cell3.innerHTML = `<td><button class="btn btn-light" style="display: block; margin: auto;"  (click)="delCat(` + row.id + `)">Verwijder</button></td>`;
    this.i++

  }

  delCat(rowid: number){ //temp functie voor verwijderen row
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("myTable");
    var row: HTMLElement = <HTMLElement> document.getElementById(rowid.toString());
    row.remove()
  }

  

  myFunction() { //Rename!!!; eerste stap voor aanpassen category; roept popup op
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
