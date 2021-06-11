import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

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
    ).subscribe();
  }

  private get id$() {
    return this.route.paramMap.pipe(
      map(params => params.get('id')),
    );
  }

  public deleteRecipe() {
    this.id$.pipe(
      tap(recipeId => this.recipesService.deleteRecipe(recipeId)),
    ).subscribe();
    this.router.navigate(['/home']);
  }

  public clickImage(imageUrl: string) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      maxWidth: "1200px",
      maxHeight: "800px",
      data: {imageUrl: imageUrl }
    })
  }
}
