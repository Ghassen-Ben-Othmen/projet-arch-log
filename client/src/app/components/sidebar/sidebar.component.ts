import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private categorieService: CategorieService,
              private userService: UserService) { }

  ngOnInit() {
    this.categorieService.getCategories();
  }

  goToelection(id: string): void{
    console.log(id);
  }

}
