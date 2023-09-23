import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAutenticate: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  login(user: User) {
    if (user.nome === 'ionan' && user.senha === '123') {
      this.userAutenticate = true;

      this.router.navigate(['/']);

      this.showMenuEmitter.emit(true);
    } else {
      this.userAutenticate = false;
      this.showMenuEmitter.emit(false);
    }
  }

  verifyUserAutenticate() {
    return this.userAutenticate;
  }
}
