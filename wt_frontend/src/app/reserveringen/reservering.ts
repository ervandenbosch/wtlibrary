// export interface Reservering {
//     id: number;
//     title: string;
//     name: string;
//     dateReserved: string;
//     available: number;
//     user_id: number;
//     book_id: number;
// }

export class Reservering {

    constructor(
                public id: number,
                public title: string,
                public name: string,
                public dateReserved: string, 
                public available: number,
                public user_id: number,
                public book_id: number
                ){
                }
}
