import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService) {
    this.user = new User();
   }

  ngOnInit() {
  }

  signup(): void{
    this.userService.signup(this.user);
  }

}
