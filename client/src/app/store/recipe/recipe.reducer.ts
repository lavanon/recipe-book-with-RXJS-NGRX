import { Action, createReducer, on } from "@ngrx/store";
import { recipeAdapter } from "./recipe.adapter";
import * as RecipesActions from "./recipe.actions";
import { RecipeState } from "./recipe.interface";

export const initialState: RecipeState = recipeAdapter.getInitialState({});

export const recipeReducerFn = createReducer(
  initialState,
  on(RecipesActions.addRecipe, (state, { payload }) => {
      return recipeAdapter.addOne(payload, state);
  }),
  on(RecipesActions.removeRecipe, (state, { payload }) => {
      return recipeAdapter.removeOne(payload, state);
  }),
  on(RecipesActions.updateRecipe, (state, { payload }) => {
    return recipeAdapter.updateOne(
        { id: payload.id, changes: { ...payload } },
        state);
  }),
  on(RecipesActions.upsertOneRecipe, (state, { payload }) => {
    return recipeAdapter.upsertOne(payload, state);
  }),
  on(RecipesActions.upsertRecipes, (state, { payload }) => {
    return recipeAdapter.upsertMany(payload, state);
  }),
);

export function recipeReducer(
  state = initialState,
  action: Action
): RecipeState {
  return recipeReducerFn(state, action);
}
