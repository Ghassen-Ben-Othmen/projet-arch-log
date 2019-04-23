import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { Election } from 'src/app/models/election';
import { Candidat } from 'src/app/models/candidat';
import { ToastrService } from 'ngx-toastr';
import { ElectionService } from 'src/app/services/election.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.scss']
})
export class AddElectionComponent implements OnInit {

  public election: Election;
  public categorie: string;

  constructor(public categorieService: CategorieService,
              private notifService: ToastrService,
              private electionService: ElectionService,
              private router: Router) {
    this.election = new Election();
    this.categorie = 'Catégorie';
   }

  ngOnInit() {
  }

  setCategorie(id: string, nom: string): void {
    this.categorie = nom;
    this.election.id_categorie = id;
    
  }

  addElection(): void{
    console.log(this.election)
    if (!this.election.id_categorie) {
      this.notifService.error('Election sans catégorie', 'Election', { progressBar: true });
    } else {
      this.electionService.addElection(this.election).subscribe(res => {
        this.categorieService.getCategories();
        this.notifService.success('Election ajoutée', 'Election', { progressBar: true });
        this.router.navigate(['home']);
      },
        err => {
          console.log(err);
          this.notifService.error(err.error.message, 'Election', { progressBar: true });
        });
    }
  }

}
