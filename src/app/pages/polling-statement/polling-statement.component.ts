// polling-statement.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-polling-statement',
  templateUrl: './polling-statement.component.html',
  styleUrls: ['./polling-statement.component.css']
})
export class PollingStatementComponent implements OnInit {

  statementForm: FormGroup = this._fb.group({
    numberOfBallotsIssued: [0, [Validators.required, Validators.nullValidator, Validators.min(1)]],
    serialNumberOfBallotsIssued: [''],
    rangeOf100BookletsFrom: [0],
    rangeOf100BookletsTo: [0],
    rangeOf50BookletsFrom: [0],
    rangeOf50BookletsTo: [0],
    rangeOf25BookletsFrom: [0],
    rangeOf25BookletsTo: [0],
    rangeOf10BookletsFrom: [0],
    rangeOf10BookletsTo: [0]
  });

  constructor(private _fb: FormBuilder, private _service: BallotAccessService, private _router: Router) { }

  ngOnInit(): void {
  }

  saveDetails() {

    const rangeOf100 = parseInt(this.statementForm.value.rangeOf100BookletsTo) - parseInt(this.statementForm.value.rangeOf100BookletsFrom);
    if (rangeOf100 < 0) {
      this._service.showError('Range of 100 booklets is invalid');
      return;
    }
    const rangeOf50 = parseInt(this.statementForm.value.rangeOf50BookletsTo) - parseInt(this.statementForm.value.rangeOf50BookletsFrom);
    if (rangeOf50 < 0) {
      this._service.showError('Range of 50 booklets is invalid');
      return;
    }
    const rangeOf25 = parseInt(this.statementForm.value.rangeOf25BookletsTo) - parseInt(this.statementForm.value.rangeOf25BookletsFrom);
    if (rangeOf25 < 0) {
      this._service.showError('Range of 25 booklets is invalid');
      return;
    }
    const rangeOf10 = parseInt(this.statementForm.value.rangeOf10BookletsTo) - parseInt(this.statementForm.value.rangeOf10BookletsFrom);
    if (rangeOf10 < 0) {
      this._service.showError('Range of 10 booklets is invalid');
      return;
    }
    let remainingBallots = parseInt(this.statementForm.value.numberOfBallotsIssued);
    if (rangeOf100 > 0) {
      remainingBallots = remainingBallots - rangeOf100 - 1;
    }
    if (rangeOf50 > 0) {
      remainingBallots = remainingBallots - rangeOf50 - 1;
    }
    if (rangeOf25 > 0) {
      remainingBallots = remainingBallots - rangeOf25 - 1;
    }
    if (rangeOf10 > 0) {
      remainingBallots = remainingBallots - rangeOf10 - 1;
    }
    if (remainingBallots > 0) {
      this._service.showError('Number of ballots entered is not matching with the total based on entered ranges');
      return;
    }

    const requestBody = {
      numberOfBallotsIssued: this.statementForm.value.numberOfBallotsIssued,
      serialNumberOfBallotsIssued: this.statementForm.value.serialNumberOfBallotsIssued,
      rangeOf100Booklets: `${this.statementForm.value.rangeOf100BookletsFrom}-${this.statementForm.value.rangeOf100BookletsTo}`,
      rangeOf50Booklets: `${this.statementForm.value.rangeOf50BookletsFrom}-${this.statementForm.value.rangeOf50BookletsTo}`,
      rangeOf25Booklets: `${this.statementForm.value.rangeOf25BookletsFrom}-${this.statementForm.value.rangeOf25BookletsTo}`,
      rangeOf10Booklets: `${this.statementForm.value.rangeOf10BookletsFrom}-${this.statementForm.value.rangeOf10BookletsTo}`
    }
    this._service.saveDetailsBeforePoll(requestBody)
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.statementForm.reset();
        this._service.showSuccess('Success', 'Details saved successfully');
        this._router.navigateByUrl('/statement/details');
      });

  }

}
