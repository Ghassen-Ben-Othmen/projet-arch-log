import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CategorieService } from 'src/app/services/categorie.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  action: Subject<any>;

  constructor(public modalRef: MDBModalRef,
              private categorieService: CategorieService) { 
    this.action = new Subject();
  }

  ngOnInit() {
  }

  confirm(): void {
    this.action.next('oui');
  }

}
