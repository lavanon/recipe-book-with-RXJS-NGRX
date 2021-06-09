import { IngredientModel } from "./ingredient.model";

export interface RecipeModel {
  id: number;
  title: string;
  description: string;
  coverImageUrl: string;
  additionalImageUrls: string[];
  ingredients: IngredientModel[];
  steps: string[];
}
