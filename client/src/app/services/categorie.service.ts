import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private categories: Categorie[];
  private headers: HttpHeaders;

  private uri = 'http://localhost:3000/categorie';

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private notifService: ToastrService) { 
    this.categories = [];
    this.headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
  }

  getCategories(): void{

    this.http.get(`${this.uri}/list`, {headers: this.headers}).subscribe(res => {
      const key = 'categories';
      this.categories = res[key];
    },
    err => {
      console.log(err);
    });
  }

  addCategorie(categorie: Categorie): Observable<any>{

    const request = {
      categorie: {
        nom: categorie.nom
      }
    }

    return this.http.post(`${this.uri}/add`, request, {headers: this.headers});
  }


  deleteCategorie(id: string): Observable<any>{
    
    return this.http.delete(`${this.uri}/delete/${id}`, {headers: this.headers});
  }

  getCategorieById(id: string): Observable<Categorie>{
    return this.http.get<Categorie>(`${this.uri}/${id}`, {headers: this.headers});
  }

  updateCategorie(id: string ,categorie: Categorie): Observable<any>{
    const req = {
      _id: categorie._id,
      nom: categorie.nom
    }
    return this.http.put(`${this.uri}/update/${id}`, {categorie: req}, {headers: this.headers});
  }
}
