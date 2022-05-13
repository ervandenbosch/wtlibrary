import { Exemplaar } from "src/app/reserveringen/exemplaar"
import { User } from "src/app/service/user"

export interface StatusHistory {
    id: number;
    admin_modif: boolean;
    active: boolean;
    sh_code: string;
    status: string;
    timestamp: string;
    exemplaar: Exemplaar;
    user: User;
    // available: number; 
}

// export class Reservering {

//     constructor(
//                 public id: number,
//                 public title: string,
//                 public name: string,
//                 public dateReserved: string, 
//                 public available: number,
//                 public user_id: number,
//                 public book_id: number
//                 ){
//                 }
// }
