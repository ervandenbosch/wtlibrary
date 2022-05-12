import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Exemplaar } from './exemplaar';

@Injectable({
  providedIn: 'root',
})
export class ExemplaarService {
  private apiServerUrl = environment.apiBaseurl;

  exemplaren: Exemplaar[] | undefined;

  constructor(private http: HttpClient) {}

  public getExemplaren(): Observable<Exemplaar[]> {
    return this.http.get<Exemplaar[]>(`${this.apiServerUrl}/exemplaar/all`);
  }

  public addExemplaar(exemplaar: Exemplaar): Observable<Exemplaar> {
    return this.http.post<Exemplaar>(
      `${this.apiServerUrl}/exemplaar/add`,
      exemplaar
    );
  }

  public exemplaarLijstMaken(exemplaar: Exemplaar, copies: number) {
    for (let i = 0; i < copies; i++) {
      this.exemplaren?.push(exemplaar);
    }
    return this.http.post<Exemplaar>(
      `${this.apiServerUrl}/exemplaar/addlist`,
      this.exemplaren
    );
  }

  public addExemplaarList(exemplaren: Exemplaar[]): Observable<Exemplaar> {
    return this.http.post<Exemplaar>(
      `${this.apiServerUrl}/exemplaar/addlist`,
      exemplaren
    );
  }

  public updateExemplaar(exemplaar: Exemplaar): Observable<Exemplaar> {
    return this.http.put<Exemplaar>(
      `${this.apiServerUrl}/exemplaar/update`,
      exemplaar
    );
  }

  public deleteExemplaar(exemplaar_id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/exemplaar/delete/${exemplaar_id}`
    );
  }

  public getExemplarenBybookCode(bookCode: string): Observable<Exemplaar[]> {
    return this.http.get<Exemplaar[]>(
      `${this.apiServerUrl}/exemplaar/${bookCode}`
    );
  }

  public getExemplarenBybookId(bookId: number): Observable<Exemplaar[]> {
    return this.http.get<Exemplaar[]>(
      `${this.apiServerUrl}/exemplaar/boekexemplaren/${bookId}`
    );
  }
}
