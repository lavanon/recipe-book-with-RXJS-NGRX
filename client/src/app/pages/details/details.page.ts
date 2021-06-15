import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleteModalComponent } from 'src/app/components/confirm-delete-modal/confirm-delete-modal.component';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { RecipeFacadeService } from 'src/app/store/recipe/recipe-facade.service';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  public recipe$: Observable<RecipeModel> = this._recipeFacadeService.recipe$;

  constructor(
    private dialog: MatDialog,
    private _recipeFacadeService: RecipeFacadeService

  ) {
    this._recipeFacadeService.getOneRecipe();
  }

  ngOnInit(): void {
  }

  public deleteRecipe( recipe: RecipeModel) {
    const confirmDialog = this.dialog.open(ConfirmDeleteModalComponent, {
      data: {  title: `Are you sure you want to delete your ${recipe.title} recipe?` }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this._recipeFacadeService.deleteRecipe(recipe.id);
      }
    });
  }

  public clickImage(imageUrl: string) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      maxWidth: '1200px',
      maxHeight: '800px',
      data: {imageUrl }
    });
  }
}
