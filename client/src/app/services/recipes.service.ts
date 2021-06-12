import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecipeModel } from '../../../../shared/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public recipes$ = new BehaviorSubject<Array<RecipeModel>>(undefined);
  public selected$ = new BehaviorSubject<RecipeModel>(undefined);
  private readonly API_BASE_URL = 'http://localhost:4199';
  private readonly baseUrl = `${this.API_BASE_URL}/recipes/`

  constructor(
    private http: HttpClient
  ) { }

  public getRecipes(): Observable<RecipeModel[]> {
    return this.http.get<Array<RecipeModel>>(this.baseUrl);
  }

  // public getOneRecipe(id: number | string): Observable<RecipeModel> {
  //   return this.http.get<RecipeModel>(`${this.baseUrl}${id}`);
  // }

  public getOneRecipe(id: number | string): void {
    const url = `${this.API_BASE_URL}/recipes/${id}`;
    this.http.get<RecipeModel>(url).pipe(
      tap(recipe => this.selected$.next(recipe))
    ).subscribe();
  }

  public createRecipe(newRecipe: RecipeModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(this.baseUrl, newRecipe);
  }

  public updateRecipe(nextRecipe: Partial<RecipeModel>) {
    return this.http.put<RecipeModel>(`${this.baseUrl}${nextRecipe.id}`, nextRecipe);
  }

  public deleteRecipe(id: number | string): Observable<RecipeModel> {
    return this.http.delete<RecipeModel>(`${this.baseUrl}${id}`);
  }
}
