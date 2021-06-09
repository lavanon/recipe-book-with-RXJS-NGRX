import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {
  @Input() public recipe: RecipeModel;

  constructor() { }

  ngOnInit(): void {
  }

}
