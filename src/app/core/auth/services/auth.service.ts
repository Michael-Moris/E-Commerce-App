import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }
  login(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }
}
