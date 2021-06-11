import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ImageModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onClickCancel() {
    this.dialogRef.close();
  }

}
