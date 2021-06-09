import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  constructor(
    private recipesService: RecipesService,
  ) { }

  public recipes$ = this.recipesService.recipes$;

  ngOnInit(): void {
    this.recipesService.getRecipes();
  }

}
