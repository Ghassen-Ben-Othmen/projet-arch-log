import { Component, OnInit, isDevMode } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { CategorieService } from 'src/app/services/categorie.service';
import { ElectionService } from 'src/app/services/election.service';
import { Categorie } from 'src/app/models/categorie';
import { Election } from 'src/app/models/election';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public img_src: string;

  constructor(public router: Router) {

    this.img_src = isDevMode() ? 'http://localhost:3000' : window.location.origin;
   }
 
  ngOnInit() {
  }

}
