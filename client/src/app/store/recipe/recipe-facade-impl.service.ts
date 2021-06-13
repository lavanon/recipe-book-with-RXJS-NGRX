import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { EntityState } from "@ngrx/entity";
import { Observable } from "rxjs";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import { RecipeFacadeService } from "./recipe-facade.service";
import { RecipeActions } from ".";
import * as RecipeSelectors from "./recipe.selectors";
import { RecipeModel } from "../../../../../shared/models/recipe.model";
import { RouterFacadeService } from "../router/router-facade.service";

@Injectable()
export class RecipeFacadeImplService implements RecipeFacadeService {
    public recipes$ = this.store.pipe(select(RecipeSelectors.selectAllRecipes));

    public recipe$: Observable<RecipeModel> = this._routerFacade.params$.pipe(
        map(params => params["id"]),
        filter(obj => !!obj),
        switchMap((id: string) =>
            this.store.pipe(
                select(RecipeSelectors.selectRecipeById(id)),
                filter(obj => !!obj)
            )
        ),
    );

    constructor(
        private readonly store: Store<EntityState<RecipeModel>>,
        private _routerFacade: RouterFacadeService
    ) { }

    public getRecipes() {
        this.store.dispatch(RecipeActions.getRecipesRequestStarted());
    }

    public getOneRecipe(id?: number | string): void {
      if (id) {
          this.store.dispatch(RecipeActions.getOneRecipesRequestStarted(id));
      } else {
          this._routerFacade.params$.pipe(
              map(params => params["id"]),
              tap(data => console.log(data)),
              filter(obj => !!obj),
              tap(idParam => this.store.dispatch(RecipeActions.getOneRecipesRequestStarted(idParam))),
              take(1)
          ).subscribe();
      }
    }

    public addRecipe( recipe: RecipeModel ): void {
        this.store.dispatch(RecipeActions.addRecipeRequestStarted(recipe));
    }

    public deleteRecipe( recipeId: string) {
        this.store.dispatch(RecipeActions.removeRecipeRequestStarted(recipeId));
    }

    public updateRecipe( nextRecipe: Partial<RecipeModel> ) {
      this.store.dispatch(RecipeActions.patchRecipeRequestStarted( nextRecipe ));
    }
}
