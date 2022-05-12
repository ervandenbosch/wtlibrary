import { Boek } from "../boekenlijst/boek";

export interface Exemplaar {
    id: number;
    availability: boolean;
    book_code: string;
    copyid: string;
    staat: string;
    boek: Boek;
}