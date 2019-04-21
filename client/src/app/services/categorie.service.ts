import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private categories: Categorie[];

  private uri = 'http://localhost:3000/categorie';

  constructor(private http: HttpClient,
              private tokenService: TokenService) { 
    this.categories = [];
  }

  getCategories(): void{

    const token = this.tokenService.getToken();

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': token
    });

    this.http.get(`${this.uri}/list`, {headers}).subscribe(res => {
      const key = 'categories';
      this.categories = res[key];
    },
    err => {
      console.log(err);
    });
  }
}
