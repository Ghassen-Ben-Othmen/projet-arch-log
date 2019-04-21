import { Election } from './election';

export class Categorie {

    constructor(){
        this.nom = '';
        this.elections = [];
    }

    public _id?: string;
    public nom: string;
    public elections: Election[];
}
