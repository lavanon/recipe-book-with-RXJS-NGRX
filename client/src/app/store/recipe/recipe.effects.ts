import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { RecipeActions } from '.';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeModel } from "../../../../../shared/models/recipe.model";
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
@Injectable()
export class RecipeEffects {
    public getRecipes$ = this.getRecipes();

    public addRecipeSuccess$ = this.addRecipeSuccess();
    public addRecipe$ = this.addRecipe();
    public patchRecipe$ = this.patchRecipe();
    public updateRecipe$ = this.updateRecipe();
    public deleteRecipe$ = this.deleteRecipe();
    public removeRecipe$ = this.removeRecipe();
    public upsertRecipe$ = this.upsertRecipe();

    public somethingFailed$ = this.somethingFailed();

    constructor(
        private _actions: Actions,
        private _recipeService: RecipesService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,


    ) { }

    private getRecipes() {
        return createEffect(() =>
            this._actions.pipe(
                ofType(RecipeActions.getRecipesRequestStarted),
                switchMap(() =>
                    this._recipeService.getRecipes().pipe(
                        map((recipeModel: RecipeModel[]) =>
                            RecipeActions.getRecipesRequestSuccess({ recipeModel })
                        ),
                        catchError((error) =>
                            of(RecipeActions.getRecipesRequestFailure({ payload: error }))
                        )
                    )
                )
            )
        );
    }

    private getOneRecipes() {
      return createEffect(() =>
          this._actions.pipe(
              ofType(RecipeActions.getOneRecipesRequestStarted),
              mergeMap(({ recipeId }) =>
                  this._recipeService.getOneRecipe(recipeId).pipe(
                      map((recipeModel: RecipeModel) =>
                          RecipeActions.getOneRecipesRequestSuccess({ recipeModel })
                      ),
                      catchError((error) =>
                          of(RecipeActions.getOneRecipesRequestFailure({ payload: error }))
                      )
                  )
              )
          )
      );
  }

    private addRecipe() {
      return createEffect(() =>
          this._actions.pipe(
              ofType(RecipeActions.addRecipeRequestStarted),
              mergeMap(({ newRecipe }) =>
                  this._recipeService.createRecipe(newRecipe).pipe(
                      map(createdRecipe =>
                          RecipeActions.addRecipeRequestSuccess({ createdRecipe })),
                      catchError(error =>
                          of(RecipeActions.addRecipeRequestFailure({ payload: error.message }))
                      )
                  )
              )
          )
      );
  }

    private patchRecipe() {
        return createEffect(() =>
            this._actions.pipe(
                ofType(RecipeActions.patchRecipeRequestStarted),
                mergeMap(({ recipe }) => {
                    return this._recipeService.updateRecipe(recipe).pipe(
                        map((patchedFile) =>
                            RecipeActions.patchRecipeRequestSuccess({ recipe: patchedFile })
                        ),
                        catchError((error) =>
                            of(RecipeActions.patchRecipeRequestFailure({ payload: error }))
                        )
                    );
                })
            )
        );
    }


    private deleteRecipe() {
        return createEffect(() =>
            this._actions.pipe(
                ofType(RecipeActions.removeRecipeRequestStarted),
                mergeMap(({ recipeId }) =>
                    this._recipeService.deleteRecipe(recipeId).pipe(
                        map(() =>
                            RecipeActions.removeRecipeRequestSuccess({ recipeId }),
                        ),
                        catchError(error =>
                            of(RecipeActions.removeRecipeRequestFailure({ payload: error.message }))
                        )
                    )
                ),
            )
        );
    }

    private removeRecipe() {
        return createEffect(() =>
            this._actions.pipe(
                ofType(RecipeActions.removeRecipeRequestSuccess),
                tap(() => {
                  this.openSnackBar(`I was getting sick of that recipe too...`);
                  this._router.navigate(['/home']);
                }),
                map(({ recipeId: payload }) => {
                    return RecipeActions.removeRecipe({ payload: payload });
                })
            )
        );
    }


    private addRecipeSuccess() {
      return createEffect(() =>
          this._actions.pipe(
              ofType(RecipeActions.addRecipeRequestSuccess),
              tap(recipe => this.openSnackBar(`Your ${recipe.createdRecipe.title} recipe looks yum!`)),
              tap(recipe => this._router.navigate([`./recipes/${recipe.createdRecipe.id}`])),
              map(() => RecipeActions.getRecipesRequestStarted())
          )
      );
    }

    private upsertRecipe() {
      return createEffect(() =>
          this._actions.pipe(
              ofType(
                  RecipeActions.getRecipesRequestSuccess,
              ),
              map(({ recipeModel: payload }) =>
                  RecipeActions.upsertRecipes({ payload })
              ),
          ),
      );
  }
  private upsertOneRecipe() {
    return createEffect(() =>
        this._actions.pipe(
            ofType(
              RecipeActions.getOneRecipesRequestSuccess,
            ),
            map(({ recipeModel: payload }) =>
              RecipeActions.upsertOneRecipe({ payload })
            ),
        ),
    );
  }

  private updateRecipe() {
    return createEffect(() =>
        this._actions.pipe(
            ofType(RecipeActions.patchRecipeRequestSuccess),
            map(({ recipe: payload }) =>
                RecipeActions.updateRecipe({ payload })
            ),
            tap(recipe => this.openSnackBar(`The new additions look nice!`)),
            tap(() => this._router.navigate(['../'], { relativeTo: this._route })),


        )
    );
  }

  private somethingFailed() {
    return createEffect(() =>
        this._actions.pipe(
          ofType(
            RecipeActions.getRecipesRequestFailure,
            RecipeActions.addRecipeRequestFailure,
            RecipeActions.patchRecipeRequestFailure,
            RecipeActions.removeRecipeRequestFailure,
            RecipeActions.getOneRecipesRequestFailure
          ),
          tap(recipe => this.openSnackBar(`Um, I dunno what happened...`, false)),
        ),
        { dispatch: false }
    );
  }

  private openSnackBar(message: string, isPositive = true) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this._snackBar.open(message, 'dismiss', {
      horizontalPosition: horizontalPosition,
      duration: 10000,
      verticalPosition: verticalPosition,
      panelClass: isPositive? ["goodToast"] : ["badToast"]
    });
  }
}

