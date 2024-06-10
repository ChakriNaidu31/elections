import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { ToWords } from 'to-words';
import { PollingStation } from 'src/app/models/polling-station';
import { BallotAccessService } from 'src/app/services/ballot-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-entry',
  templateUrl: './result-entry.component.html',
  styleUrls: ['./result-entry.component.css']
})
export class ResultEntryComponent implements OnInit {

  station!: PollingStation;
  candidates: any[] = [];

  constructor(private _service: BallotAccessService, private _router: Router) { }

  ngOnInit(): void {
    this._service.getCurrentElectionDetails().pipe(
      catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.candidates = response.data?.election?.candidates;
      });
  }

  submitResult() {
    this._service.addResult({ result: this.candidates }).pipe(
      catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this._service.showSuccess('Success', response.data?.message);
        this._router.navigateByUrl('/result');
      });
  }

  convertToWords(event: Event, candidate: any): void {
    try {
      const digit: string = (event.target as HTMLInputElement).value;
      const toWords = new ToWords({
        localeCode: 'en-GB'
      });
      candidate.numberInWords = toWords.convert(parseInt(digit));
      candidate.votes = parseInt(digit);
    } catch (error) {
      candidate.numberInWords = "Zero";
      candidate.votes = 0;
    }
  }

  redirectToList() {
    this._router.navigateByUrl('/result');
  }

}
