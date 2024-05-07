import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-polling-statement-details',
  templateUrl: './polling-statement-details.component.html',
  styleUrls: ['./polling-statement-details.component.css']
})
export class PollingStatementDetailsComponent implements OnInit {

  statementForm: FormGroup = this._fb.group({
    totalNumberOfRegisteredVoters: [0, [Validators.required, Validators.nullValidator, Validators.min(1)]],
    totalNumberOfProxyVoters: [0],
    totalNumberOfAbsentVoters: [0, [Validators.required, Validators.nullValidator]],
    totalNumberOfTransferVoters: [0],
    serialNumberOfBVD: ['', Validators.required],
    serialNumberOfReplacedBVD: [''],
    stampNumber: ['', Validators.required]
  });

  constructor(private _fb: FormBuilder, private _service: BallotAccessService, private _router: Router) { }

  ngOnInit(): void {
    // TODO: check if this page is already filled, if so redirect to next page
  }

  saveDetailsAtPoll(stepper: MatStepper) {

    try {
      if (parseInt(this.statementForm.value.totalNumberOfRegisteredVoters) < 0 || isNaN(parseInt(this.statementForm.value.totalNumberOfRegisteredVoters))) {
        this._service.showError('Total number of registered voters cannot be 0');
        return;
      }
      if (parseInt(this.statementForm.value.totalNumberOfProxyVoters) < 0 || isNaN(parseInt(this.statementForm.value.totalNumberOfProxyVoters))) {
        this._service.showError('Total number of proxy voters should be a valid number');
        return;
      }
      if (parseInt(this.statementForm.value.totalNumberOfAbsentVoters) < 0 || isNaN(parseInt(this.statementForm.value.totalNumberOfAbsentVoters))) {
        this._service.showError('Total number of absent voters should be a valid number');
        return;
      }
      if (parseInt(this.statementForm.value.totalNumberOfTransferVoters) < 0 || isNaN(parseInt(this.statementForm.value.totalNumberOfTransferVoters))) {
        this._service.showError('Total number of transfer voters should be a valid number');
        return;
      }

      const requestBody = {
        totalNumberOfRegisteredVoters: this.statementForm.value.totalNumberOfRegisteredVoters,
        totalNumberOfProxyVoters: this.statementForm.value.totalNumberOfProxyVoters,
        totalNumberOfAbsentVoters: this.statementForm.value.totalNumberOfAbsentVoters,
        totalNumberOfTransferVoters: this.statementForm.value.totalNumberOfTransferVoters,
        serialNumberOfBVD: this.statementForm.value.serialNumberOfBVD,
        serialNumberOfReplacedBVD: this.statementForm.value.serialNumberOfReplacedBVD,
        stampNumber: this.statementForm.value.stampNumber
      }
      this._service.saveDetailsAtPoll(requestBody)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this._service.showSuccess('Success', 'Details saved successfully');
          stepper.next();
        });
    } catch (error: any) {
      this._service.showError("Internal Server Error. Please enter valid numbers");
    }

  }

}
