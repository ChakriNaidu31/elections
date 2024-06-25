import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ToWords } from 'to-words';
import { ElectionResult } from 'src/app/models/election-result';
import { PollingStation } from 'src/app/models/polling-station';
import { BallotAccessService } from 'src/app/services/ballot-access.service';
import { Region } from 'src/app/models/region';
import { Constituency } from 'src/app/models/constituency';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  regionList: Region[] = [];
  constituencyList: Constituency[] = [];
  stationList: PollingStation[] = [];
  currentStation!: PollingStation;
  results: ElectionResult[] = [];
  totalVotes: number = 0;
  rejectedVotes: number = 0;
  totalBallots: number = 0;
  canUpdateResults: boolean = false;
  regionId: string = '';
  constituencyId: string = '';
  stationId: string = '';

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this._service.getUserAccess()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.currentStation = response.data?.station;
      });

    this.rejectedVotes = this.totalBallots - this.totalVotes;
    this.getData();
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
    this.canUserUpdateResults();
  }

  getData(): void {
    this._service.getResult(this.regionId, this.constituencyId, this.stationId).pipe(
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
  }

  fetchRegionList(): void {
    this._service.getRegionList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.regionList = response.data?.regions;
      });
  }

  loadConstituencyByRegion(regionId: string = ''): void {
    this.stationList = [];
    this.stationId = '';
    if (!regionId) {
      this.constituencyList = [];
      this.constituencyId = '';
      return;
    } else {
      this._service.getConstituencyList()
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          const constituencies = response.data?.constituencies;
          this.constituencyList = constituencies.filter((constituency: Constituency) => constituency.region._id === regionId);
        });
    }
  }

  loadStationByConstituency(constituencyId: string = ''): void {
    if (!constituencyId) {
      this.stationList = [];
      this.stationId = '';
      return;
    } else {
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
  }

  filterByRegion(event: Event): void {
    this.regionId = (event.target as HTMLSelectElement).value;
    this.loadConstituencyByRegion(this.regionId);
    this.getData();
  }

  filterByConstituency(event: Event): void {
    this.constituencyId = (event.target as HTMLSelectElement).value;
    this.loadStationByConstituency(this.constituencyId);
    this.getData();
  }

  filterByStation(event: Event): void {
    this.stationId = (event.target as HTMLSelectElement).value;
    this.getData();
  }

  canUserUpdateResults(): void {
    this.canUpdateResults = this._service.canUpdateResults();
    if (!this.canUpdateResults) {
      this.fetchRegionList();
    }
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
