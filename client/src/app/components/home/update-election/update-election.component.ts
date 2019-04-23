import { Component, OnInit, isDevMode } from '@angular/core';
import { Election } from 'src/app/models/election';
import { ElectionService } from 'src/app/services/election.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-update-election',
  templateUrl: './update-election.component.html',
  styleUrls: ['./update-election.component.scss']
})
export class UpdateElectionComponent implements OnInit {

  public election: Election;
  public categorie: string;
  public img_src: string;

  constructor(private electionService: ElectionService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public categorieService: CategorieService,
              private notifService: ToastrService) { 
    this.election = new Election();
    this.election.date_debut = new Date(this.election.date_debut);
    this.election.date_fin = new Date(this.election.date_fin);
    this.img_src = isDevMode() ? 'http://localhost:3000' : window.location.origin;
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.electionService.getElection(id).subscribe(res => {
        const key = 'election';
        this.election = res[key];
        this.getCategorieElection();
      },
      err => {
        console.log(err);
        this.router.navigate(['home']);
      });
    });

  }

  getCategorieElection(): void{

    this.categorieService.getCategorieById(this.election.id_categorie).subscribe(res => {
      this.categorie = res['categorie'].nom;
    },
    err => {
      console.log(err);
    });
  }

  setCategorie(id: string, nom: string): void {
    this.categorie = nom;
    this.election.id_categorie = id;

  }

  deleteCandidat(id: string): void {
    this.electionService.deleteCandidat(id, this.election._id).subscribe(res => {
      const key = 'election';
      this.election = res[key];
      this.getCategorieElection();
      this.notifService.success('Candidat supprimé', 'Candidat', {progressBar: true});
    },
    err => {
      console.log(err);
      this.notifService.error(err.error.message, 'Candidat', { progressBar: true });
    });
  }

  ajouterCandidat(): void {
    let candidat = {
      nom: '',
      image: '',
      nb_votes: 0
    };

    let request = {
      candidat,
      id_election: this.election._id
    }

    this.electionService.addCandidat(request).subscribe(res => {

      this.election = res['election'];
      this.getCategorieElection();
    },
    err => {
      console.log(err);
      this.notifService.error(err.error.message, 'Candidat', { progressBar: true });
    });
  }

  updateElection(): void {
    this.electionService.updateElection(this.election._id, this.election).subscribe(res => {

      this.election = res['election'];
      this.categorieService.getCategories();
      this.getCategorieElection();
      this.notifService.success('Election éditeé', 'Election', {progressBar: true});
    },
      err => {
        console.log(err);
        this.notifService.error(err.error.message, 'Election', { progressBar: true });
      });
  }

  updateNomCandidat(candidat: any): void {
    const request = {
      nom: candidat.nom,
      id_candidat: candidat._id,
      id_election: this.election._id
    }

    this.electionService.updateNomCandidat(request).subscribe(res => {

      this.election = res['election'];
      this.getCategorieElection();
      this.notifService.success('Candidat édité', 'Candidat', { progressBar: true });
    },
      err => {
        console.log(err);
        this.notifService.error(err.error.message, 'Candidat', { progressBar: true });
      });
  }

  uploadFile(e, id_candidat: string): void {
    let file: File = e.target.files[0];

    this.electionService.uploadImage(file, id_candidat, this.election._id).subscribe(res => {
      this.election = res['election'];
      this.getCategorieElection();
      location.reload();
      this.notifService.success('Candidat édité', 'Candidat', { progressBar: true });
    },
    err => {
      console.log(err);
      this.notifService.error(err.error.message, 'Candidat', { progressBar: true });
    });

  }




}
