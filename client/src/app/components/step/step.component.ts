import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Input() canDelete = false;
  @Input() isStationary = true;
  @Output() delete = new EventEmitter<number>();
  @Input() steps: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }


  public onClickDelete(index: number) {
    this.delete.emit(index);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
}

  super(index) {
    return index + 1;
  }
}
