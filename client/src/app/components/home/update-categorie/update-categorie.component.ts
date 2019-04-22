import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.scss']
})
export class UpdateCategorieComponent implements OnInit {

  public categorie: Categorie;

  constructor(private activatedRoute: ActivatedRoute,
              private categorieService: CategorieService,
              private notifService: ToastrService,
              private router: Router) {
    this.categorie = new Categorie();
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      this.categorieService.getCategorieById(id).subscribe(res => {
        const key = 'categorie';
        this.categorie = res[key];
      },
      err => {
        console.log(err);
      });
    })
  }

  update(): void{
  
    this.categorieService.updateCategorie(this.categorie._id, this.categorie).subscribe(res => {
      this.categorieService.getCategories();
      this.notifService.success('Catégorie', '', {progressBar: true});
      this.router.navigate(['home']);
    },
    err => {
      console.log(err);
      this.notifService.error(err.error.message, 'Catégorie', {progressBar: true});
    });
  }

}
