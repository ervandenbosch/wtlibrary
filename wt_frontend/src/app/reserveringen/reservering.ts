export class Reservering {

    constructor(
                public id: number,
                public title: string,
                public firstName: string,
                public lastName: string,
                public dateReserved: string, 
                public available: number,
                public user_id: number,
                public book_id: number
                ){
                }
}
