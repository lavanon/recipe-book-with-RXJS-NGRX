import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LandingPage } from './pages/landing/landing.page';
import { HomePage } from './pages/home/home.page';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';
import { DetailsPage } from './pages/details/details.page';
import { StepComponent } from './components/step/step.component';
import { EditPage } from './pages/edit/edit.page';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { EditCoverImageModalComponent } from './components/edit-cover-image-modal/edit-cover-image-modal.component';
import { CreatePage } from './pages/create/create.page';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

// ngrx
import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule, RECOMPUTE } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { RecipeStoreModule } from './store/recipe/recipe-store.module';
import { RouterStoreModule } from './store/router/router-store.module';
import { CustomSerializer } from './store/router/router.serializer';
import { reducers } from './store/router/router.reducer';

/**
 * NGRX
 */
export function logger(reducer: ActionReducer<object>): ActionReducer<object> {
  return (state, action) => {
      const result = reducer(state, action);

      if (action.type !== RECOMPUTE) {
          console.groupCollapsed(action.type);
          console.log(`prev state`, state);
          console.log(`action`, action);
          console.log(`next state`, result);
          console.groupEnd();
      }
      return result;
  };
}

export const developmentReducers = [logger];
export const metaReducers = environment.production ? [] : developmentReducers;

export const APPLICATION_MAT_IMPORTS = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  // CDK
  DragDropModule

];

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    HomePage,
    RecipeListComponent,
    RecipeListItemComponent,
    DetailsPage,
    StepComponent,
    EditPage,
    IngredientsListComponent,
    EditCoverImageModalComponent,
    CreatePage,
    ImageModalComponent,
    ConfirmDeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // NGRX
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: CustomSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 15 }) : [],
    ...APPLICATION_MAT_IMPORTS,
    RecipeStoreModule,
    RouterStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
