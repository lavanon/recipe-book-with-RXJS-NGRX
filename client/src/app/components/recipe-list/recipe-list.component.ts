import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Input() public recipes: Array<RecipeModel>;

  constructor() { }

  ngOnInit(): void {
  }

}
