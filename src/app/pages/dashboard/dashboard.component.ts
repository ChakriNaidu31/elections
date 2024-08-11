import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { Election } from 'src/app/models/election';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regionWinners: { [region: string]: string } = {
    region1: 'party1',
    region2: 'party2',
    region3: 'party3',
    region4: 'party1',
    region5: 'party2',
    region6: 'party3',
    region7: 'party1',
    region8: 'party2',
    region9: 'party3',
    region10: 'party1',
    region11: 'party2',
    region12: 'party3',
    region13: 'party1',
    region14: 'party2',
    region15: 'party3',
    region16: 'party1'
  };


  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  election!: Election;
  status: string = '';
  winnersbyRegion: any[] = [];


  constructor(private _service: BallotAccessService) { }

  ngOnInit(): void {
    this._service.fetchDashboard().pipe(
      catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.election = response.data?.election;
        this.status = response.data?.status;
      });

    this._service.fetchStats().pipe(
      catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.winnersbyRegion = response.data?.results;
      });
  }

  getRegionColor(region: string): string {

    if (this.winnersbyRegion.length <= 0) {
      return 'grey';
    }

    const filteredRegion = this.winnersbyRegion.filter((localRegion) => localRegion.region?.code === region );
    if (filteredRegion && filteredRegion.length > 0 && filteredRegion[0]?.winner?.partyColor) {
      return filteredRegion[0].winner.partyColor;
    } else {
      return 'grey';
    }
  }


  regionClicked(region: string): void {
    const winner = this.regionWinners[region];
    console.log(` ${region} won ${winner}`);
  }

}
