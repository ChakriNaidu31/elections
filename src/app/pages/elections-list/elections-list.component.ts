import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elections-list',
  templateUrl: './elections-list.component.html',
  styleUrls: ['./elections-list.component.css']
})
export class ElectionsListComponent {

  constructor( private _router: Router) {
  }
  
  addNewElections() {
    this._router.navigateByUrl('/admin/elections/create');
  }
}
