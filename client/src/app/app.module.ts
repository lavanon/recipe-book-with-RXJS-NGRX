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

import { LandingPage } from './pages/landing/landing.page';
import { HomePage } from './pages/home/home.page';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';
import { DetailsPage } from './pages/details/details.page';
import { StepComponent } from './components/step/step.component';
import { EditPage } from './pages/edit/edit.page';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { EditCoverImageModalComponent } from './components/edit-cover-image-modal/edit-cover-image-modal.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...APPLICATION_MAT_IMPORTS,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
