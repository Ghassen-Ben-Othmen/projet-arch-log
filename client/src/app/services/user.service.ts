import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  private uri = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private notifService: ToastrService,
              private router: Router,
              private tokenService: TokenService) {
    this.user = tokenService.getUserFromToken();
   }

  signup(user: User): void{
    const request = {user}
    this.http.post(`${this.uri}/user/inscri`, request).subscribe(res => {
      this.notifService.success('Inscription réussie', 'Inscription', {progressBar: true});
      this.router.navigate(['signin']);
    },
    err => {
      this.notifService.error(err.error.message, 'Inscription', { progressBar: true });
    });
  }

  signin(credentials: any): void{
    this.http.post(`${this.uri}/user/auth`, credentials).subscribe(res => {
      const key = 'user';
      const token_key = 'token';
      this.user = res[key];
      const token = res[token_key];
      this.tokenService.saveToken(token);
      this.notifService.success('Connexion réussie', 'Connexion', {progressBar: true});
      this.router.navigate(['home']);
    },
    err => {
      console.log(err);
      this.notifService.error(err.error.message, 'Connexion', { progressBar: true });
    });
  }

}
