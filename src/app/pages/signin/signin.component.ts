import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginResponse } from 'src/app/models/login-response';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMessage: string = '';

  constructor(private _fb: FormBuilder, private _service: BallotAccessService, private _router: Router) { }

  ngOnInit() {
  }

  submitUserLogin() {
    this._service.loginUser(this.myForm.controls['username'].value, this.myForm.controls['password'].value)
      .pipe(catchError((error) => {
        this.errorMessage = error.error?.error?.message;
        return '';
      }))
      .subscribe((data: any) => {
        const loginResponse: LoginResponse = data.data;
        this._service.setSessionToken(loginResponse.userToken);
        this.getUserRoles();
      });
  }

  getUserRoles() {
    this._service.getUserAccess()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        const roles = response.data?.roles;
        this._service.setSessionRoles(roles);
        this._router.navigateByUrl('/dashboard');
      });
  }

}
