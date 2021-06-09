import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-cover-image-modal',
  templateUrl: './edit-cover-image-modal.component.html',
  styleUrls: ['./edit-cover-image-modal.component.scss']
})
export class EditCoverImageModalComponent implements OnInit {
  public newCoverImageUrl: string;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public currentCoverImageUrl: string,
    private dialogRef: MatDialogRef<EditCoverImageModalComponent>,
  ) { }

  ngOnInit(): void {
    this.newCoverImageUrl = this.currentCoverImageUrl;
  }

  public onClickCancel() {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this.dialogRef.close(this.newCoverImageUrl);
  }

}
