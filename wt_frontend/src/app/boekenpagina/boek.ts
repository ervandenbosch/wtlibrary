export class Boek {

    constructor(
        public book_id:     number,
        public isbn:        string,
        public title:       string,
        public n_o_copies:  number,
        public n_available: number,
        public description: string,
        public pad        : string) {
        }
}
