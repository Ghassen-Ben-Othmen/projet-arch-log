import { Injectable, isDevMode } from '@angular/core';
import { Election } from '../models/election';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  private uri = isDevMode() ? 'http://localhost:3000' : window.location.origin;

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
    return this.http.post(`${this.uri}/election/add`, {election}, {headers: this.headers});
  }

  getElection(id: string): Observable<Election>{
    return this.http.get<Election>(`${this.uri}/election/${id}`, {headers: this.headers});
  }

  deleteCandidat(id_candidat: string, id_election: string): Observable<any>{
    const request = {
      id_candidat,
      id_election
    };
    console.log(request)

    return this.http.put(`${this.uri}/election/delete/candidat`, request, {headers: this.headers});
  }

  updateElection(id: string, election: Election): Observable<any>{
    return this.http.put(`${this.uri}/election/update/${id}`, {election}, {headers: this.headers});
  }

  deleteElection(id: string): Observable<any>{
    return this.http.delete(`${this.uri}/election/delete/${id}`, {headers: this.headers});
  }


  addCandidat(request: any): Observable<any>{
    
    return this.http.put(`${this.uri}/election/add-candidat`, request, {headers: this.headers});
  }

  updateNomCandidat(request: any): Observable<any>{
    return this.http.put(`${this.uri}/election/update-nom-candidat`, request, {headers: this.headers});
  }

  uploadImage(file: File, id_candidat: string, id_election: string): Observable<any>{
    let fd: FormData = new FormData();
    fd.append("file", file, file.name);

    return this.http.put(`${this.uri}/election/upload/${id_election}/${id_candidat}`, fd, {headers: this.headers});
  }

  
}
