import { Injectable } from '@angular/core';
import { Election } from '../models/election';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  private uri = "http://localhost:3000/election";

  private elections: Election[];
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
              private tokenService: TokenService) { 
    this.elections = [];
    this.headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
  }

  addElection(election: Election): Observable<any>{
    return this.http.post(`${this.uri}/add`, {election}, {headers: this.headers});
  }
}
