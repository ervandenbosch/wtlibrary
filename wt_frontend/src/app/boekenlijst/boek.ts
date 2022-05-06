export interface Boek {
  id: number;
  title: string;
  isbn: string;
  thumbnailUrl: string;
  authors: string;
  categories: string;
  status: string;
  pageCount: number;
  copies: number;
  available: number;
  bookCode: string;
}

// export class Boek {

//     constructor(public book_id:     number,
//         public isbn:        string,
//         public title:       string,
//         public n_o_copies:  number,
//         public n_available: number) {
//         }
// }
