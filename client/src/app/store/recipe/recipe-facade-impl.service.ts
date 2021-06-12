import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { EntityState } from "@ngrx/entity";
import { Observable } from "rxjs";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import { RecipeFacadeService } from "./recipe-facade.service";
import { RecipeActions } from ".";
import * as RecipeSelectors from "./recipe.selectors";
import { selectRecipeById } from "./recipe.selectors";
import { ItemId, RecipeModel } from "../../../../../shared/models/recipe.model";

@Injectable()
export class RecipeFacadeImplService implements RecipeFacadeService {
    public recipes$ = this.store.pipe(select(RecipeSelectors.selectAllRecipes));

    // public recipe$: Observable<RecipeModel> = this._routerFacade.params$.pipe(
    //     map(params => params["recipeId"]),
    //     filter(obj => !!obj),
    //     switchMap((id: string) =>
    //         this.store.pipe(
    //             select(RecipeSelectors.selectRecipeById(id)),
    //             filter(obj => !!obj)
    //         )
    //     ),
    // );

    constructor(
        private readonly store: Store<EntityState<RecipeModel>>,
    ) { }

    public getRecipes() {
        this.store.dispatch(RecipeActions.getRecipesRequestStarted());
    }

    public addRecipe( recipe: RecipeModel ): void {
        this.store.dispatch(RecipeActions.addRecipeRequestStarted(recipe));
    }

    public deleteRecipe( recipeId: string) {
        this.store.dispatch(RecipeActions.removeRecipeRequestStarted(recipeId));
    }

    public updateRecipe( nextRecipe: Partial<RecipeModel> ) {
      this.store.dispatch(RecipeActions.patchRecipeRequestStarted( nextRecipe ));

        // this.store.pipe(
        //     // select(selectRecipeById(recipe.id)),
        //     // take(1),
        //     map(() => this._getDifferencesForPatchWithId(storedRecipe, nextRecipe)),
        //     tap((recipePatch: Partial<RecipeModel>) => {
        //     })
        // ).subscribe();
    }



  //   private _getDifferencesForPatchWithId<T extends ItemId>(storedObject: T, newObject: Partial<T>): Partial<T> {
  //     const result: Partial<T> = {};
  //     result.id = storedObject.id;
  //     if (!storedObject && !newObject) {
  //         return result;
  //     }
  //     // all keys in new value but not in old value
  //     const newKeys = Object.keys(newObject).filter(key => !Object.keys(storedObject).includes(key)); // new new keys

  //     for (const pair of Object.entries(storedObject)) {
  //         const key = pair[0];
  //         const storedValue = pair[1];
  //         if (Array.isArray(storedValue) || typeof storedValue === "object") {
  //             continue;
  //         }
  //         const newValue = newObject[key];
  //         if (newValue && newValue !== storedValue) {
  //             result[key] = newValue;
  //         }
  //     }

  //     for (const key of newKeys ) {
  //         const newValue = newObject[key];

  //         if (Array.isArray(newValue) || typeof newValue === "object") {
  //             continue;
  //         }
  //         result[key] = newValue;
  //     }
  //     return result;
  // }

}
