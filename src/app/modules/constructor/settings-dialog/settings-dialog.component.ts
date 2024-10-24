import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SettingsDialog } from '../models/form.interface';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
})
export class SettingsDialogComponent implements OnInit{
  public readonly toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>, // Ensure this is correct
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(){
    this.form = new FormGroup({
      stepType: new FormControl('', [Validators.required]),
      nameProcess: new FormControl('', [Validators.required]),
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      nextStep: new FormControl('', [Validators.required])
    })
  }

  public onClose(): void {
    this.dialogRef.close(this.data);
  }

  public onSave(): void {
    const newSettings = {
      ...this.form,
      id: this.data.elements.id,
      role: 'Alex'

    }
    console.log(newSettings);
  }
}
