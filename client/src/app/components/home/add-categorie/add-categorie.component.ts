import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

  public categorie: Categorie;

  constructor(public modalRef: MDBModalRef,
              private categorieService: CategorieService,
              private notifService: ToastrService) {
    this.categorie = new Categorie();
   }

  ngOnInit() {
  }

  addCategorie(): void{

    this.categorieService.addCategorie(this.categorie).subscribe(res => {
      this.categorieService.getCategories();
      this.modalRef.hide();
      this.notifService.success('Categorie ajoutée', 'Catégorie', {progressBar: true});
    },
      err => {
        console.log(err);
        this.notifService.error(err.error.message, 'Catégorie', { progressBar: true });
      });
  }

}
