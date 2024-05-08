import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginResponse } from 'src/app/models/login-response';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  myForm: FormGroup = this._fb.group({
    password: ['', Validators.required],
    retypePassword: ['', Validators.required]
  });

  constructor(private _fb: FormBuilder, private _service: BallotAccessService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  submitPage() {
    const token = this._activatedRoute.snapshot.queryParams['generated'];
    if (this.myForm.valid) {

      if (this.myForm.value.password !== this.myForm.value.retypePassword) {
        this._service.showError("Passwords should match");
        return;
      }
      this._service.setPassword(this.myForm.controls['password'].value, token)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((data: any) => {
          const loginResponse: LoginResponse = data.data;
          this._service.setSessionToken(loginResponse.userToken);
          this._router.navigateByUrl('/dashboard');
        });
    }
  }

}
