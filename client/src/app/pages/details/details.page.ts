import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
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
}
