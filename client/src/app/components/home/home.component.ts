import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { CategorieService } from 'src/app/services/categorie.service';
import { ElectionService } from 'src/app/services/election.service';
import { Categorie } from 'src/app/models/categorie';
import { Election } from 'src/app/models/election';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private electionService : ElectionService) { }
 
  elections :Election[] = [];
  ngOnInit() {
 
   this.electionService.getByCategorie("5cb776c17a81480b680ec28a").subscribe(res=>{
   this.elections= res["elections"];

   });

  
  
  }

}
