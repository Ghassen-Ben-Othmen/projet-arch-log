import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public user: User;
  
  constructor(private userService: UserService) {
    this.user = new User();
   }

  ngOnInit() {
  }

  signin(): void{
    const credentials = {cin: this.user.cin, mdp: this.user.mdp};
    this.userService.signin(credentials);
  }

}
