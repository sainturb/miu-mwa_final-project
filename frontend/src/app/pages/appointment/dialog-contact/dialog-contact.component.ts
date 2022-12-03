import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-contact',
  templateUrl: './dialog-contact.component.html',
  styleUrls: ['./dialog-contact.component.scss']
})
export class DialogContactComponent implements OnInit {
  myInfo = this.data.dataKey;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    console.log(this.myInfo)
  }

}
