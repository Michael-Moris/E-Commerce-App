import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private roter: Router) { }

  register(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }
  login(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }

  decodeToken() {

    try {
      if (typeof localStorage !== 'undefined') {
        const decoded = jwtDecode(localStorage.getItem('authToken')!);
        console.log(decoded);
      }

    } catch {
      this.logOut()
    }

  }

  saveToken(token: string): void {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('authToken', token)
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined')
      return localStorage.getItem('authToken')
    return null
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined')
      return !!localStorage.getItem('authToken')
    return false
  }

  logOut() {
    this.roter.navigate(['/login'])
    localStorage.clear();
  }
}
