import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;

  constructor(private httpClient: HttpClient, private roter: Router) { }

  register(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }
  login(data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }
  setEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/forgotPasswords', data)
  }
  setCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/verifyResetCode', data)
  }
  setResetPass(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'auth/resetPassword', data)
  }

  decodeToken() {
    try {
      if (typeof localStorage !== 'undefined') {
        const decoded = jwtDecode(localStorage.getItem('authToken')!);
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

  getUserName(): string | null {
    try {
      const token = this.getToken();
      if (token) {
        const decoded: any = jwtDecode(token);
        return decoded.name || null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logOut();
    }
    return null;
  }

  saveUserData(): void {
    if (localStorage.getItem('authToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('authToken')!);
    }
  }

  logOut() {
    this.roter.navigate(['/login'])
    localStorage.clear();
  }
}
