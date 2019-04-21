import { Candidat } from './candidat';

export class Election {

    constructor(){
        this.nom = '';
        this.date_debut = null;
        this.date_fin = null;
        this.candidat = [];
    }

    public _id?: string;
    public nom: string;
    public id_election?: string;
    public date_debut: Date;
    public date_fin: Date;
    public candidat: Candidat[];
}
