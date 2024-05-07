import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roles: string[] = [];

  constructor(private _service: BallotAccessService, private _router: Router) { }

  ngOnInit() {
    const rolesInSession: string[] = this._service.getRolesFromSession();
    if (rolesInSession.length > 0) {
      this.roles = rolesInSession;
    } else {
      this._service.getUserAccess()
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          const roles = response.data?.roles;
          this._service.setSessionRoles(roles);
          this.roles = roles;
        });
    }
  }

  logoutUser() {
    this._service.logoutUser();
    this._router.navigateByUrl('/login');
  }

  findAccess(menuName: string): boolean {
    menuName = menuName?.toUpperCase();
    const readAccess = `${menuName}: read`;
    const writeAccess = `${menuName}: write`;
    return (this.roles.indexOf(readAccess) > -1 || this.roles.indexOf(writeAccess) > -1)
  }

}
