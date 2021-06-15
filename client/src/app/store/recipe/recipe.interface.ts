import { EntityState } from '@ngrx/entity';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

export interface RecipeState extends EntityState<RecipeModel> {
}

