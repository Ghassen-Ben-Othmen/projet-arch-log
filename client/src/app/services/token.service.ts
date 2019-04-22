import { Injectable } from '@angular/core';
import { User } from '../models/user';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLoggedIn(): boolean{
    
    if ((this.getToken() !== null) && (this.getToken() !== '')) {
      return true;
    }
    return false;
  }

  getUserFromToken(): User{
    if(this.isLoggedIn()){
      const token = this.getToken();
      const from_token = jwt_decode(token);
      let user: User = new User();
      user._id = from_token._id;
      user.role = from_token.role;
      return user;
    }
    return null;
    
  }

  getToken(): string{
    return JSON.parse(JSON.stringify(localStorage.getItem('token'))); 
  }

  clearToken(): void{
    localStorage.removeItem('token');
  }

  saveToken(token): void{
    JSON.stringify(localStorage.setItem('token', token));
  }
}
