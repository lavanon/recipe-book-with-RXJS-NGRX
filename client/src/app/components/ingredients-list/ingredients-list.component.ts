import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientModel } from '../../../../../shared/models/ingredient.model';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  @Input() public ingredients: Array<IngredientModel>;
  @Input() public canDelete = false;
  @Input() isStationary = true;

  @Output() public delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClickDelete(index: number) {
    this.delete.emit(index);
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ingredients, event.previousIndex, event.currentIndex);
  }
}
