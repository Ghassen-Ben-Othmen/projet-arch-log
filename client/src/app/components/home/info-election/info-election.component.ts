import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Election } from 'src/app/models/election';
import { ElectionService } from 'src/app/services/election.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-election',
  templateUrl: './info-election.component.html',
  styleUrls: ['./info-election.component.scss']
})
export class InfoElectionComponent implements OnInit {

  public election: Election;
  public modalRef: MDBModalRef;

  constructor(private activatedRoute: ActivatedRoute,
              private electionService: ElectionService,
              private router: Router,
              private modalService: MDBModalService,
              private categorieService: CategorieService,
              private notifService: ToastrService) {
    this.election = new Election();
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      this.electionService.getElection(id).subscribe(res => {
        const key = 'election';
        this.election = res[key];
      },
      err => {
        this.router.navigate(['home']);
        console.log(err);
      });
    });
  }

  checkDate(): string{
    let now = new Date();
    let election_date_deb = new Date(this.election.date_debut);
    let election_date_fin = new Date(this.election.date_fin);

    if(election_date_deb > now){
      return 'not yet';
    }
    if(election_date_fin < now){
      return 'ended';
    }
    if(election_date_deb >= now && election_date_fin <= now){
      return 'now';
    }

  }

  updateElectionForm(): void {
    this.router.navigate(['home/update-election', this.election._id]);
  }


  deleteElectionModal(): void{
    let modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true
    };
    this.modalRef = this.modalService.show(ConfirmDeleteComponent, {modalOptions});

    this.modalRef.content.action.subscribe(result => {
      if (result === 'oui') {
        this.electionService.deleteElection(this.election._id).subscribe(res => {
          this.modalRef.hide();
          this.categorieService.getCategories();
          this.router.navigate(['home']);
          this.notifService.success('Election supprimée', 'Election', { progressBar: true });
        },
          err => {
            console.log(err);
            this.notifService.error(err.error.message, 'Election', { progressBar: true });
          });
      }
    });
  }
}
