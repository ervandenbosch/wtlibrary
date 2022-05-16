import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from './category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/categories/all`)
  }

  public getCategory(categoryName: String): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/categories/${categoryName}`)
  }

  public addCategories(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/categories/add`, category)
  }

  public updateCategories(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/categories/update`, category)
  }

  public deleteCategories(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiServerUrl}/categories/delete/${categoryId}`)
  }
}
