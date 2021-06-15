import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

export const recipeAdapter: EntityAdapter<RecipeModel>
    = createEntityAdapter<RecipeModel>({
        selectId: (recipe: RecipeModel) => recipe.id
    });
