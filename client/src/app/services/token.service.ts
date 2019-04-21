import { Injectable } from '@angular/core';

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
