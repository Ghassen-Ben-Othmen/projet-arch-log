import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ElectionService } from 'src/app/services/election.service';
import { Election } from 'src/app/models/election';
import { TokenService } from 'src/app/services/token.service';
import { UserVotesService } from 'src/app/services/user-votes.service';
import { UserVotes } from 'src/app/models/user-votes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  constructor(private userService:  UserService, private electionService : ElectionService,
    private userVotesService : UserVotesService,
    private router : Router) { }

    //votes of connected user
  votes : UserVotes[] = [] ;
  //elections voted by user
  elections : Election[] = [];
  ngOnInit() {

    this.userVotesService.getVotes(this.userService.user._id).subscribe(res=>{
      this.votes = res["votes"];
      this.votes.forEach(vote=>{
        this.electionService.getElection(vote.id_election).subscribe(res=>{
          this.elections.push(res["election"]);
        });
      })
      
    });

  }
  consulter(id_election: string):void{
    this.router.navigate(['home/info-election', id_election]);
  }
  
  




}
