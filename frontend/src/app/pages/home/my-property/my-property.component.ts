import { Component, OnInit } from '@angular/core';
import {PropertyService} from "../../../core/services/property.service";
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./my-property.component.scss']
})
export class MyPropertyComponent implements OnInit {
  columns: any[] = ['title', 'price', 'address', 'rooms', 'images', 'type', 'purpose', 'edit', 'cancel'];
  properties: any[] = [];
  constructor(private propertyService: PropertyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.propertyService.myProperties().subscribe(properties => this.properties = properties);
  }

  onEdit(property: any) {
    let dialogRef = this.dialog.open(EditComponent, {
      width: '600px',
      data: property
    });

    dialogRef.afterClosed().subscribe(result => {
      const updatedFields: any = {};
      Object.keys(result).forEach(key => {
        if (property[key] !== result[key]) {
          updatedFields[key] = result[key];
        }
      });

      this.propertyService.patchProperty(property._id, updatedFields).subscribe(_ => {
        this.fetch();
      });
    });
  }

  onDelete(property: any) {
    const yes = confirm('Do you still want to delete the property?');
    if (yes) {
      this.propertyService.deleteProperty(property._id).subscribe(_ => {
        this.fetch();
      });
    }
  }
}
