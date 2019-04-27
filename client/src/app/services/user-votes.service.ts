import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { User } from '../models/user';
import { UserVotes } from '../models/user-votes';


@Injectable({
  providedIn: 'root'
})
export class UserVotesService {

  private uri = isDevMode() ? 'http://localhost:3000' : window.location.origin;
  user : User;
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
    private notifService: ToastrService,
    private router: Router,
    private tokenService: TokenService) {
      this.user = tokenService.getUserFromToken();
      this.headers = new HttpHeaders({
        'Authorization': this.tokenService.getToken()
      });
     }

  // add election id
  addElection (id_election: string, id_user:string): Observable<UserVotes>{
    return this.http.post<UserVotes>(`${this.uri}/uservotes/add-election/${id_election}`, {id_user},{headers: this.headers});
  }

  //get Votes of user
  getVotes(id_user: string):Observable<UserVotes[]>{
    return this.http.get<UserVotes[]>(`${this.uri}/uservotes/votes/${id_user}`, {headers: this.headers});
  }
}
