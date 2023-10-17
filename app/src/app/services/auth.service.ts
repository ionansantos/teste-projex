import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAutenticate: boolean = false;
  private errorSubject = new Subject<string>();

  constructor(private router: Router, private http: HttpClient) {}

  login(user: User) {
    const requestData = {
      email: user.email, // Acesse a propriedade username do objeto user
      password: user.password, // Acesse a propriedade password do objeto user
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post(`${environment.API}/login_check`, requestData, {
        headers,
      })
      .subscribe(
        (response) => {
          this.userAutenticate = true;
          this.router.navigate(['/']);
          // this.showMenuEmitter.emit(true);
          console.log('Resposta do servidor:', response);
        },
        (error) => {
          this.errorSubject.next('Email ou Senha Incorreto.');
          console.error('Erro na requisição:', error);
        }
      );

    // if (user.email === 'ionan' && user.password === '123') {
    //   this.userAutenticate = true;

    //   this.router.navigate(['/']);

    //   this.showMenuEmitter.emit(true);
    // } else {
    //   this.userAutenticate = false;
    //   this.showMenuEmitter.emit(false);
    // }
  }

  // logout(): Observable<any> {
  //   return this.http.post(`${environment.API}/signout`);
  // }

  getErrorSubject() {
    return this.errorSubject.asObservable();
  }

  verifyUserAutenticate() {
    return this.userAutenticate;
  }
}
