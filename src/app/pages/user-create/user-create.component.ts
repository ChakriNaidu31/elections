import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { PollingStation } from 'src/app/models/polling-station';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    station: [''],
    constituency: ['']
  });
  pageTitle: string = "Add New User";
  stationList: PollingStation[] = [];
  constituencyList: Constituency[] = [];
  roleList = [
    { key: 'ADMIN', value: 'Admin' },
    { key: 'RETURNING_OFFICER', value: 'Returning Officer' },
    { key: 'POLLING_OFFICER', value: 'Polling Officer' }
  ];
  showPasswordField: boolean = false;

  constructor(private _service: BallotAccessService, private _fb: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchConstituencyList();
  }

  fetchConstituencyList(): void {
    this._service.getConstituencyList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.constituencyList = response.data?.constituencies;
      });
  }

  loadStation(event: Event): void {
    const constituencyId: string = (event.target as HTMLSelectElement).value;
    this.userForm.controls['station'].setValue('');
    this._service.getPollingStationList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        const stations = response.data?.stations;
        this.stationList = stations.filter((station: PollingStation) => station.constituency._id === constituencyId);
      });
  }

  createUser() {
    if (this.showPasswordField) {
      const createdPass = this.userForm.controls['password'].value;
      if (!createdPass) {
        this._service.showError('Password is required');
        return;
      } else {
        this._service.createAdminUser(this.userForm.value)
          .pipe(catchError((error) => {
            this._service.showError(error.error?.error?.message);
            return '';
          }))
          .subscribe((response: any) => {
            this.userForm.reset();
            this._service.showSuccess('Success', 'User created successfully');
            this._router.navigateByUrl('/admin/user');
          });
      }
    } else {
      this._service.createUser(this.userForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.userForm.reset();
          this._service.showSuccess('Success', 'User created successfully');
          this._router.navigateByUrl('/admin/user');
        });
    }
  }

  togglePasswordShow(event: Event): void {
    const selectedRole = (event.target as HTMLSelectElement).value;
    if (selectedRole === 'ADMIN') {
      this.showPasswordField = true;
    } else {
      this.showPasswordField = false;
    }
  }

  redirectToList() {
    this._router.navigateByUrl('/admin/user');
  }

}
