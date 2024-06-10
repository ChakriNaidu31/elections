import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ToWords } from 'to-words';
import { ElectionResult } from 'src/app/models/election-result';
import { PollingStation } from 'src/app/models/polling-station';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  station!: PollingStation;
  results: ElectionResult[] = [];
  totalVotes: number = 0;
  rejectedVotes: number = 0;
  totalBallots: number = 0;

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.rejectedVotes = this.totalBallots - this.totalVotes;
    this._service.getResult().pipe(
      catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.results = response.data?.results;
        this.totalVotes = this.results.reduce((totalVotes, currentVote) => totalVotes + currentVote.votes, 0);
        if (this.totalBallots > 0) {
          this.rejectedVotes = this.totalBallots - this.totalVotes;
        }
      });
    this._service.getDetailsAfterPoll().pipe(
      catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.totalBallots = response.data?.pollStatementAfterPoll?.numberOfBallotsIssuedToRegisteredVoters;
        if (this.totalVotes > 0) {
          this.rejectedVotes = this.totalBallots - this.totalVotes;
        }
      });
  }

  redirectToResultEntry() {
    this._router.navigateByUrl('/result/entry');
  }

  convertToWords(digit: number): string {
    const toWords = new ToWords({
      localeCode: 'en-GB'
    });
    return toWords.convert(digit);
  }

}
