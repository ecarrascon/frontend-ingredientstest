import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from './ingredient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients/all`);
  }

  public addIngredients(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.apiUrl}/ingredients/add`, ingredient);
  }

  public updateIngredients(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/ingredients/update`, ingredient);
  }

  public deleteIngredients(ingredientId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ingredients/delete/${ingredientId}`);
  }

}
