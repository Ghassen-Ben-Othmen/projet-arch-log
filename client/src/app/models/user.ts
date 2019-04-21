export class User {
    constructor(){
        this.code = null;
        this.cin = null;
        this.mdp = '';
        this.ville = '';
        this.role = '';
        this.votes = null;
    }

    public _id?: string;
    public code: number;
    public cin: number;
    public mdp: string;
    public ville: string;
    public role: string;
    public votes: [{
        id_elecion: string
    }];
}
