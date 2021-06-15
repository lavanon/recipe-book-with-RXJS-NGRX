import { createAction, props } from '@ngrx/store';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

export enum RecipeActionTypes {

    GetRecipesRequestStarted = '[Recipes] GET_RECIPES_REQUEST_STARTED',
    GetRecipesRequestSuccess = '[Recipes] GET_RECIPES_REQUEST_SUCCESS',
    GetRecipesRequestFailure = '[Recipes] GET_RECIPES_REQUEST_FAILURE',

    GetOneRecipesRequestStarted = '[Recipes] GET_ONE_RECIPES_REQUEST_STARTED',
    GetOneRecipesRequestSuccess = '[Recipes] GET_ONE_RECIPES_REQUEST_SUCCESS',
    GetOneRecipesRequestFailure = '[Recipes] GET_ONE_RECIPES_REQUEST_FAILURE',

    AddRecipeRequestStarted = '[Recipes] ADD_RECIPE_REQUEST_STARTED',
    AddRecipeRequestSuccess = '[Recipes] ADD_RECIPE_REQUEST_SUCCESS',
    AddRecipeRequestFailure = '[Recipes] ADD_RECIPE_REQUEST_FAILURE',

    PatchRecipeRequestStarted = '[Recipes] PATCH_RECIPE_REQUEST_STARTED',
    PatchRecipeRequestSuccess = '[Recipes] PATCH_RECIPE_REQUEST_SUCCESS',
    PatchRecipeRequestFailure = '[Recipes] PATCH_RECIPE_REQUEST_FAILURE',

    RemoveRecipeRequestStarted = '[Recipes] REMOVE_RECIPE_REQUEST_STARTED',
    RemoveRecipeRequestSuccess = '[Recipes] REMOVE_RECIPE_REQUEST_SUCCESS',
    RemoveRecipeRequestFailure = '[Recipes] REMOVE_RECIPE_REQUEST_FAILURE',

    AddRecipe = '[Recipes] ADD_RECIPE',
    AddRecipes = '[Recipes] ADD_RECIPES',
    RemoveRecipe = '[Recipes] REMOVE_RECIPE',
    UpsertRecipes = '[Recipes] UPSERT_RECIPES',
    UpdateRecipe = '[Recipes] UPDATE_RECIPE',
    UpsertRecipe = '[Recipes] UPSERT_RECIPE',

  }

// Get recipe
export const getRecipesRequestStarted = createAction(
    RecipeActionTypes.GetRecipesRequestStarted,
);
export const getRecipesRequestSuccess = createAction(
    RecipeActionTypes.GetRecipesRequestSuccess,
    props<{recipeModel: RecipeModel[] }>()
);
export const getRecipesRequestFailure = createAction(
    RecipeActionTypes.GetRecipesRequestFailure,
    props<{payload: any }>()
);

// Get One recipe
export const getOneRecipesRequestStarted = createAction(
  RecipeActionTypes.GetOneRecipesRequestStarted,
  (   recipeId: number | string,
    ) => ({ recipeId })
);
export const getOneRecipesRequestSuccess = createAction(
  RecipeActionTypes.GetOneRecipesRequestSuccess,
  props<{recipeModel: RecipeModel}>()
);
export const getOneRecipesRequestFailure = createAction(
  RecipeActionTypes.GetOneRecipesRequestFailure,
  props<{payload: any }>()
);

// Add Recipe
export const addRecipeRequestStarted = createAction(
    RecipeActionTypes.AddRecipeRequestStarted,
    ( newRecipe: RecipeModel ) => ({ newRecipe})
);
export const addRecipeRequestSuccess = createAction(
    RecipeActionTypes.AddRecipeRequestSuccess,
    props<{createdRecipe: RecipeModel }>()
);
export const addRecipeRequestFailure = createAction(
    RecipeActionTypes.AddRecipeRequestFailure,
    props<{payload: string }>()
);

// Patch Recipe
export const patchRecipeRequestStarted = createAction(
    RecipeActionTypes.PatchRecipeRequestStarted,
    (   partialRecipe: Partial<RecipeModel>,
    ) => ({ recipe: partialRecipe})
);
export const patchRecipeRequestSuccess = createAction(
    RecipeActionTypes.PatchRecipeRequestSuccess,
    props<{recipe: RecipeModel }>()
);
export const patchRecipeRequestFailure = createAction(
    RecipeActionTypes.PatchRecipeRequestFailure,
    props<{payload: any }>()
);

// Remove recipe
export const removeRecipeRequestStarted = createAction(
    RecipeActionTypes.RemoveRecipeRequestStarted,
    (   recipeId: string,
    ) => ({ recipeId })
);
export const removeRecipeRequestSuccess = createAction(
    RecipeActionTypes.RemoveRecipeRequestSuccess,
    props<{recipeId: string }>()
);
export const removeRecipeRequestFailure = createAction(
    RecipeActionTypes.RemoveRecipeRequestFailure,
    props<{payload: string }>()
);


// Reducer
export const addRecipe = createAction(
  RecipeActionTypes.AddRecipe,
  props<{ payload: RecipeModel }>()
);
export const addRecipes = createAction(
  RecipeActionTypes.AddRecipes,
  props<{ payload: RecipeModel[] }>()
);
export const removeRecipe = createAction(
    RecipeActionTypes.RemoveRecipe,
    props<{ payload: string }>()
);
export const updateRecipe = createAction(
    RecipeActionTypes.UpdateRecipe,
    props<{ payload: RecipeModel }>()
);
export const upsertOneRecipe = createAction(
    RecipeActionTypes.UpsertRecipe,
    props<{ payload: RecipeModel }>()
);
export const upsertRecipes = createAction(
  RecipeActionTypes.UpsertRecipes,
  props<{ payload: RecipeModel[] }>()
);
