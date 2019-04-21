import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private tokenService: TokenService,
              private userService: UserService) { }

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

}
