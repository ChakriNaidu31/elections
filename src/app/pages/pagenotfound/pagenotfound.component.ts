import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {

  constructor(private _location: Location) { }

  clickBack() {
    this._location.back();
  }
}
