import { Component, Inject, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  types = ['Apartment', 'Condo', 'Private House', 'Room'];

  constructor(public dialogRef: MatDialogRef<EditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      title: new FormControl(data.title, [Validators.minLength(3)]),
      description: new FormControl(data.description, [Validators.minLength(12)]),
      purpose: new FormControl(data.purpose, [Validators.required]),
      type: new FormControl(data.type, [Validators.required]),
      price: new FormControl(data.price, [Validators.required]),
      petFriendly: new FormControl(data.petFriendly),
      bedroom: new FormControl(data.bedroom, [Validators.required, Validators.min(1), Validators.max(15)]),
      bathroom: new FormControl(data.bathroom, [Validators.required, Validators.min(1), Validators.max(15)]),
    });
  }

  ngOnInit(): void {
  }

  getControl(field: string): AbstractControl<any, any> | null | undefined {
    return this.form.get(field);
  }

  save(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
