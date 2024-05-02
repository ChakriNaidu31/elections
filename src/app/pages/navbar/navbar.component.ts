import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _service: BallotAccessService, private _router: Router) { }

  ngOnInit() {

  }

  logoutUser() {
    this._service.logoutUser();
    this._router.navigateByUrl('/login');
  }

}
