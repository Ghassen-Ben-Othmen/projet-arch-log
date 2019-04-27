import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { User } from '../models/user';
import { UserVotes } from '../models/user-votes';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class UserVotesService {

  private uri = isDevMode() ? 'http://localhost:3000' : window.location.origin;
  user : User;
  constructor(private http: HttpClient,
    private notifService: ToastrService,
    private router: Router,
    private tokenService: TokenService) {
      this.user = tokenService.getUserFromToken();
     }

  // add election id
  addElection (id_election: string, id_user:string): Observable<UserVotes>{
    return this.http.post<UserVotes>(`${this.uri}/uservotes/add-election/${id_election}`, {id_user},httpOptions);
  }

  //get Votes of user
  getVotes(id_user: string):Observable<UserVotes[]>{
    return this.http.get<UserVotes[]>(`${this.uri}/uservotes/votes/${id_user}`, httpOptions);
  }
}
