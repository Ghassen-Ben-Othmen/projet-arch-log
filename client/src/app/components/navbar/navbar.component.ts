import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddCategorieComponent } from '../home/add-categorie/add-categorie.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public modalRef: MDBModalRef;

  constructor(private router: Router,
              private tokenService: TokenService,
              private userService: UserService,
              private modalService: MDBModalService,) { }

  ngOnInit() {
  }

  signin(): void{
    this.router.navigate(['signin']);
  }

  signup(): void{
    this.router.navigate(['signup']);
  }

  logout(): void{
    this.tokenService.clearToken();
    this.router.navigate(['signin']);
  }

  openModalAddCategorie(): void{
    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true
    }
    this.modalRef = this.modalService.show(AddCategorieComponent, {modalOptions});
  }

  addElectionForm(): void {
    this.router.navigate(['home/add-election']);
  }

}
