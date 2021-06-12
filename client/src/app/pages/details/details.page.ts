import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from 'src/app/components/confirm-delete-modal/confirm-delete-modal.component';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit, OnDestroy {
  private readonly _unsubscribe = new Subject();

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  public recipe$ = this.recipesService.selected$;

  ngOnInit(): void {
    this.id$.pipe(
      tap(recipeId => this.recipesService.getOneRecipe(recipeId)),
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private get id$() {
    return this.route.paramMap.pipe(
      map(params => params.get('id')),
    );
  }

  public deleteRecipe( title: string) {
    const confirmDialog = this.dialog.open(ConfirmDeleteModalComponent, {
      data: {
        title: `Are you sure you want to delete your ${title} recipe?`
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.id$.pipe(
          tap(recipeId => this.recipesService.deleteRecipe(recipeId)),
          takeUntil(this._unsubscribe)
        ).subscribe(result => {
          setTimeout(() => this.router.navigate(['/home']),200)
        });
      }
    });

  }

  public clickImage(imageUrl: string) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      maxWidth: "1200px",
      maxHeight: "800px",
      data: {imageUrl: imageUrl }
    })
  }
}
