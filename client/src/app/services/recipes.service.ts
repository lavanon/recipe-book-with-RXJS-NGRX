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

  constructor(
    private http: HttpClient
  ) { }

  public getRecipes(): void {
    const url = `${this.API_BASE_URL}/recipes`;
    this.http.get<Array<RecipeModel>>(url).pipe(
      tap(recipes => this.recipes$.next(recipes))
    ).subscribe();
  }

  public getOneRecipe(id: number | string): void {
    const url = `${this.API_BASE_URL}/recipes/${id}`;
    this.http.get<RecipeModel>(url).pipe(
      tap(recipe => this.selected$.next(recipe))
    ).subscribe();
  }

  public updateRecipe(id: number | string, nextRecipe: Partial<RecipeModel>) {
    const url = `${this.API_BASE_URL}/recipes/${id}`;
    this.http.put<RecipeModel>(url, nextRecipe).pipe(
      tap(recipe => this.selected$.next(recipe))
    ).subscribe();
  }

  public createRecipe(id: number | string, nextRecipe: RecipeModel) {
    this.getRecipeObs(nextRecipe).pipe(
      tap(recipe => this.selected$.next(recipe))
    ).subscribe();
  }

  public deleteRecipe(id: number | string) {
    const url = `${this.API_BASE_URL}/recipes/${id}`;
    this.http.delete<RecipeModel>(url).pipe(
      tap(recipe => this.selected$.next(recipe))
    ).subscribe();
}

public getRecipeObs(nextRecipe): Observable<RecipeModel> {
  const url = `${this.API_BASE_URL}/recipes`;
  return this.http.post<RecipeModel>(url,nextRecipe);
}
}
