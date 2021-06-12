import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { RecipeEffects } from "./recipe.effects";
import { recipeReducer } from "./recipe.reducer";
import { RecipeFacadeImplService } from "./recipe-facade-impl.service";
import { RecipeFacadeService } from "./recipe-facade.service";

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature("recipes", recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ],
    providers: [
        {
            provide: RecipeFacadeService,
            useClass: RecipeFacadeImplService
        }
    ]
})
export class RecipeStoreModule {}
