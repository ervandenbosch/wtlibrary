import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';
import { Observable } from 'rxjs';
import { Exemplaar } from './exemplaar';

@Injectable({
  providedIn: 'root',
})
export class ExemplaarService {

    exemplaren : Exemplaar[] | undefined;


  constructor(private http: HttpClient) {
  }

  public getExemplaren(): Observable<Exemplaar[]> {
    return this.http.get<Exemplaar[]>(`${API_URL}/exemplaar/all`);
  }

  public addExemplaar(exemplaar: Exemplaar): Observable<Exemplaar> {
    return this.http.post<Exemplaar>(`${API_URL}/exemplaar/add`, exemplaar);
  }

  public exemplaarLijstMaken(exemplaar: Exemplaar, copies:number){
      for(let i =0 ; i < copies; i++){
        this.exemplaren?.push(exemplaar)
      }
    return this.http.post<Exemplaar>(`${API_URL}/exemplaar/addlist`, this.exemplaren);  
  }

  public addExemplaarList(exemplaren: Exemplaar[]): Observable<Exemplaar> {
        return this.http.post<Exemplaar>(`${API_URL}/exemplaar/addlist`, exemplaren);
  }

  public updateExemplaar(exemplaar: Exemplaar): Observable<Exemplaar> {
    return this.http.put<Exemplaar>(`${API_URL}/exemplaar/update`, exemplaar);
  }

  public deleteExemplaar(exemplaar_id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/exemplaar/delete/${exemplaar_id}`);
  }

  public getExemplarenBybookCode(bookCode: string): Observable<Exemplaar[]> {
    return this.http.get<Exemplaar[]>(`${API_URL}/exemplaar/${bookCode}`);
  }
}
