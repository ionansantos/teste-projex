import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  token = localStorage.getItem('access_token');

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    }),
  };

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> {
    return this.http
      .post(`${environment.API}/imovel/create`, formData, this.httpOptions)
      .pipe(
        map((response) => {
          console.log(response);
        })
      );
  }
}
