import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Input() public step: string;
  @Input() public stepIndex: number;
  @Input() canDelete = false;
  @Output() delete = new EventEmitter<number>();
  public stepNumber: number;

  constructor() { }

  ngOnInit(): void {
    this.stepNumber = this.stepIndex + 1;
  }

  public onClickDelete() {
    this.delete.emit(this.stepIndex);
  }
}
