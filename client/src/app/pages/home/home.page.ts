import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeFacadeService } from 'src/app/store/recipe/recipe-facade.service';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  public recipes$: Observable<RecipeModel[]> = this.recipeFacadeService.recipes$;

  constructor(
    private recipeFacadeService: RecipeFacadeService
  ) {
    this.recipeFacadeService.getRecipes();
   }

  ngOnInit(): void {
  }
}
