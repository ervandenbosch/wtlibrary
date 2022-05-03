import { ElementRef, Component, Directive, OnInit } from '@angular/core';

@Component({
  selector: 'app-profielpagina',
  templateUrl: './profielpagina.component.html',
  styleUrls: ['./profielpagina.component.css'],
})
export class ProfielpaginaComponent implements OnInit {
  boekenlijst = [
    { id: 1, isbn: 232232, title: 'Harry Potter', description: 'blabalaal' },
    {
      id: 2,
      isbn: 23234432,
      title: 'Harry Potter 2',
      description: 'blabalaal',
    },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  template(response: any) {
    return `
<div class="d-flex flex-row pt-2">
          <div class="px-1">
            <img
              src="../assets/images/dummybook.png"
              alt="book"
              style="width: 75px; border-radius: 10px"
            />
          </div>
          <div class="px-2">
            <h6>Book title</h6>

            <p class="mx-1">Book description, blablabalbal</p>
          </div>
        </div>;
        `;
  }

  loadBooks(): void {
    let booksHTML = '';
    this.boekenlijst.forEach((profile: any) => {
      booksHTML += this.template(profile);
    });
    this.el.nativeElement.innerHTML = booksHTML;
  }
}
