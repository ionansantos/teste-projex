import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private errorSubject = new Subject<string>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, public router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${environment.API}/login`, { email, password }, this.httpOptions)
      .pipe(
        map((response: any) => {
          if (response.token) {
            localStorage.setItem('access_token', response.token);
            this.router.navigate(['/']);
            return response;
          } else {
            throw new Error('Token não encontrado na resposta.');
          }
        })
      );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(`${environment.API}/logout`, {}, httpOptions).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  // logout() {
  //   const token = localStorage.getItem('access_token');

  //   const httpOptions = {
  //     headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
  //   };

  //   this.http.post(`${environment.API}/logout`, httpOptions).subscribe(
  //     (response: any) => {
  //       localStorage.removeItem('access_token');
  //       this.router.navigate(['/login']);
  //       console.log('Logout successful', response);
  //     },
  //     (error) => {
  //       console.error('Logout error:', error);
  //     }
  //   );
  // }

  // logout(): Observable<any> {
  //   return this.http.post(`${environment.API}/signout`);
  // }

  getErrorSubject() {
    return this.errorSubject.asObservable();
  }
}
