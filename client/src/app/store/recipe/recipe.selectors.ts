import { Dictionary, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { recipeAdapter } from "./recipe.adapter";
import { RecipeModel } from "../../../../../shared/models/recipe.model";
const { selectAll, selectEntities } = recipeAdapter.getSelectors();
const selectRecipesState = createFeatureSelector<EntityState<RecipeModel>>("recipes");

export const selectAllRecipes: MemoizedSelector<
    object,
    RecipeModel[]
> = createSelector(
    selectRecipesState,
    selectAll
);
export const selectRecipeEntities: MemoizedSelector<
    object,
    Dictionary<RecipeModel>
> = createSelector(
    selectRecipesState,
    selectEntities
);

export const selectRecipeById = (recipeId: string | number) => {
    return createSelector(
        selectRecipeEntities,
        (recipes) =>
            recipes[recipeId]
    );
};
export const selectRecipesByIds = (recipeIds: string[]) => {
    return createSelector(
        selectRecipeEntities,
        (recipes) =>
            recipeIds.map(id =>
                recipes[id]
            )
    );
};

