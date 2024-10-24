import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
})
export class SettingsDialogComponent {


  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>, // Ensure this is correct
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  public onClose(): void {
    this.dialogRef.close(this.data);
  }

  public onSave(): void{
    console.log(this.data);
  }
}
