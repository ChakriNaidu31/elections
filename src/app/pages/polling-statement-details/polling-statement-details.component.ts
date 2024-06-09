import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-polling-statement-details',
  templateUrl: './polling-statement-details.component.html',
  styleUrls: ['./polling-statement-details.component.css']
})
export class PollingStatementDetailsComponent implements OnInit {

  @ViewChild('stepper') private stepper!: MatStepper;

  statementForm: FormGroup = this._fb.group({
    totalNumberOfRegisteredVoters: [0, [Validators.required, Validators.nullValidator, Validators.min(1)]],
    totalNumberOfProxyVoters: [0],
    totalNumberOfAbsentVoters: [0, [Validators.required, Validators.nullValidator]],
    totalNumberOfTransferVoters: [0],
    serialNumberOfBVD: ['', Validators.required],
    serialNumberOfReplacedBVD: [''],
    stampNumber: ['', Validators.required]
  });

  accountingForm: FormGroup = this._fb.group({
    numberOfBallotsIssuedToRegisteredVoters: [0, [Validators.required, Validators.nullValidator, Validators.min(1)]],
    numberOfBallotsIssuedToProxyVoters: [0],
    numberOfSpoiltBallots: [0],
    numberOfUnusedBallots: [0, [Validators.required, Validators.nullValidator, Validators.min(1)]],
    totalNumberOfBallots: [0],
    numberOfPersonsManuallyVerified: [0, [Validators.required, Validators.nullValidator, Validators.min(1)]]
  });

  constructor(private _fb: FormBuilder, private _service: BallotAccessService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._service.getDetailsAtPoll().subscribe((response: any) => {
      this.statementForm.patchValue(response.data?.pollStatementAtPoll);
      if (this.stepper) {
        this.stepper.selectedIndex = 1;
      }
    });

    this._service.getDetailsAfterPoll().subscribe((response: any) => {
      this.accountingForm.patchValue(response.data?.pollStatementAfterPoll);
      this.updateTotalCount();
      if (this.stepper) {
        this.stepper.selectedIndex = 2;
      }
    });
  }

  saveDetailsAtPoll() {

    try {
      if (this.stepper) {
        this.stepper.selectedIndex = 0;
      }
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
          this.stepper.next();
        });
    } catch (error: any) {
      this._service.showError("Internal Server Error. Please enter valid numbers");
    }

  }

  saveDetailsAfterPoll() {

    try {
      if (this.stepper) {
        this.stepper.selectedIndex = 2;
      }
      if (parseInt(this.accountingForm.value.numberOfBallotsIssuedToRegisteredVoters) < 0 || isNaN(parseInt(this.accountingForm.value.numberOfBallotsIssuedToRegisteredVoters))) {
        this._service.showError('Number of ballots issues to registered voters should be a valid number');
        return;
      }
      if (parseInt(this.accountingForm.value.numberOfBallotsIssuedToProxyVoters) < 0 || isNaN(parseInt(this.accountingForm.value.numberOfBallotsIssuedToProxyVoters))) {
        this._service.showError('Number of ballots issues to proxy voters should be a valid number');
        return;
      }
      if (parseInt(this.accountingForm.value.numberOfSpoiltBallots) < 0 || isNaN(parseInt(this.accountingForm.value.numberOfSpoiltBallots))) {
        this._service.showError('Number of spoilt ballots should be a valid number');
        return;
      }
      if (parseInt(this.accountingForm.value.numberOfUnusedBallots) < 0 || isNaN(parseInt(this.accountingForm.value.numberOfUnusedBallots))) {
        this._service.showError('Number of unused ballots should be a valid number');
        return;
      }

      const requestBody = {
        numberOfBallotsIssuedToRegisteredVoters: this.accountingForm.value.numberOfBallotsIssuedToRegisteredVoters,
        numberOfBallotsIssuedToProxyVoters: this.accountingForm.value.numberOfBallotsIssuedToProxyVoters,
        numberOfSpoiltBallots: this.accountingForm.value.numberOfSpoiltBallots,
        numberOfUnusedBallots: this.accountingForm.value.numberOfUnusedBallots,
        numberOfRejectedBallots: this.accountingForm.value.numberOfRejectedBallots,
        numberOfPersonsManuallyVerified: this.accountingForm.value.numberOfPersonsManuallyVerified,
      }
      this._service.saveDetailsAfterPoll(requestBody)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this._service.showSuccess('Success', 'Details saved successfully');
        });
    } catch (error: any) {
      this._service.showError("Internal Server Error. Please enter valid numbers");
    }

  }

  editBallotInformation() {
    const beforePollId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    this._router.navigateByUrl('/statement/' + beforePollId);
  }

  updateTotalCount() {
    let totalCount = 0;
    if (this.accountingForm.controls['numberOfBallotsIssuedToRegisteredVoters'].value) {
      totalCount = totalCount + this.accountingForm.controls['numberOfBallotsIssuedToRegisteredVoters'].value;
    }
    if (this.accountingForm.controls['numberOfBallotsIssuedToProxyVoters'].value) {
      totalCount = totalCount + this.accountingForm.controls['numberOfBallotsIssuedToProxyVoters'].value;
    }
    if (this.accountingForm.controls['numberOfSpoiltBallots'].value) {
      totalCount = totalCount + this.accountingForm.controls['numberOfSpoiltBallots'].value;
    }
    if (this.accountingForm.controls['numberOfUnusedBallots'].value) {
      totalCount = totalCount + this.accountingForm.controls['numberOfUnusedBallots'].value;
    }
    this.accountingForm.controls['totalNumberOfBallots'].setValue(totalCount);
  }

}
