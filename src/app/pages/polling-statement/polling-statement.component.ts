// polling-statement.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Election } from 'src/app/models/election';
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
  rangeOf100: number = 0;
  rangeOf50: number = 0;
  rangeOf25: number = 0;
  rangeOf10: number = 0;
  currentElection!: Election;

  constructor(private _fb: FormBuilder, private _service: BallotAccessService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentElectionDetails();
    this.getDetailsBeforePoll();
  }

  getCurrentElectionDetails() {
    this._service.getCurrentElectionDetails().pipe(
      catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      })
    ).subscribe((response: any) => {
      this.currentElection = response.data?.election;
    });
  }

  getDetailsBeforePoll() {
    const beforePollId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    this._service.getDetailsBeforePoll().subscribe((response: any) => {
      if (beforePollId) {
        this.statementForm.patchValue(response.data?.pollStatementBeforePoll);
        this.statementForm.controls['rangeOf100BookletsFrom'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[0]?.range?.split('-')[0]);
        this.statementForm.controls['rangeOf100BookletsTo'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[0]?.range?.split('-')[1]);
        this.statementForm.controls['rangeOf50BookletsFrom'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[1]?.range?.split('-')[0]);
        this.statementForm.controls['rangeOf50BookletsTo'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[1]?.range?.split('-')[1]);
        this.statementForm.controls['rangeOf25BookletsFrom'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[2]?.range?.split('-')[0]);
        this.statementForm.controls['rangeOf25BookletsTo'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[2]?.range?.split('-')[1]);
        this.statementForm.controls['rangeOf10BookletsFrom'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[3]?.range?.split('-')[0]);
        this.statementForm.controls['rangeOf10BookletsTo'].setValue(response.data?.pollStatementBeforePoll?.serialNumberRange[3]?.range?.split('-')[1]);
        this.validateDetails();
      } else if (response.data?.pollStatementBeforePoll) {
        this._router.navigate(['/statement/details/' + response.data?.pollStatementBeforePoll?._id])
      }
    });
  }

  async validateDetails() {
    this.rangeOf100 = parseInt(this.statementForm.value.rangeOf100BookletsTo) - parseInt(this.statementForm.value.rangeOf100BookletsFrom);
    if (this.rangeOf100 < 0) {
      this._service.showError('Range of 100 booklets is invalid');
      return;
    }
    this.rangeOf50 = parseInt(this.statementForm.value.rangeOf50BookletsTo) - parseInt(this.statementForm.value.rangeOf50BookletsFrom);
    if (this.rangeOf50 < 0) {
      this._service.showError('Range of 50 booklets is invalid');
      return;
    }
    this.rangeOf25 = parseInt(this.statementForm.value.rangeOf25BookletsTo) - parseInt(this.statementForm.value.rangeOf25BookletsFrom);
    if (this.rangeOf25 < 0) {
      this._service.showError('Range of 25 booklets is invalid');
      return;
    }
    this.rangeOf10 = parseInt(this.statementForm.value.rangeOf10BookletsTo) - parseInt(this.statementForm.value.rangeOf10BookletsFrom);
    if (this.rangeOf10 < 0) {
      this._service.showError('Range of 10 booklets is invalid');
      return;
    }

    let remainingBallots = parseInt(this.statementForm.value.numberOfBallotsIssued);
    if (this.rangeOf100 > 0) {
      this.rangeOf100 = this.rangeOf100 + 1;
      remainingBallots = remainingBallots - this.rangeOf100;
    }
    if (this.rangeOf50 > 0) {
      this.rangeOf50 = this.rangeOf50 + 1;
      remainingBallots = remainingBallots - this.rangeOf50;
    }
    if (this.rangeOf25 > 0) {
      this.rangeOf25 = this.rangeOf25 + 1;
      remainingBallots = remainingBallots - this.rangeOf25;
    }
    if (this.rangeOf10 > 0) {
      this.rangeOf10 = this.rangeOf10 + 1;
      remainingBallots = remainingBallots - this.rangeOf10;
    }
    return remainingBallots;
  }

  async saveDetails() {

    try {
      const remainingBallots = await this.validateDetails();
      if (remainingBallots && remainingBallots !== 0) {
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
          if (response.data?.pollStatementBeforePoll) {
            this._router.navigateByUrl('/statement/details/' + response.data.pollStatementBeforePoll._id);
          }
        });
    } catch (error: any) {
      this._service.showError("Internal Server Error. Please enter valid numbers");
    }

  }

}
