import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'categories');
  }

  getSpecificCategory(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}categories/${id}`);
  }
}
