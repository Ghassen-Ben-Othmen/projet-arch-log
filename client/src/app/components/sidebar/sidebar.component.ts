import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { UserService } from 'src/app/services/user.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/models/categorie';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public modalRef: MDBModalRef;

  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true
  };

  constructor(private categorieService: CategorieService,
              private userService: UserService,
              private modalService: MDBModalService,
              private notifService: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.categorieService.getCategories();
  }

  goToelection(id: string): void{
    console.log(id);
  }

  confirmModalDelete(id: string): void{
    
    this.modalRef = this.modalService.show(ConfirmDeleteComponent, {modalOptions: this.modalOptions});

    this.modalRef.content.action.subscribe(result => {
      if(result === 'oui'){
        this.categorieService.deleteCategorie(id).subscribe(res => {
          this.modalRef.hide();
          this.categorieService.getCategories();
          this.notifService.success('Catégorie supprimée', 'Catégorie', {progressBar: true});
        },
        err => {
          console.log(err);
          this.notifService.error(err.error.message, 'Catégorie', {progressBar: true});
        });
      }
    });
  }

  updateForm(id: string): void {

    this.router.navigate(['home/update-categorie', id]);
  }

}
