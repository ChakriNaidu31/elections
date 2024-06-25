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

  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  election!: Election;
  status: string = '';

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

    if (typeof google !== 'undefined' && google.charts) {
      google.charts.load('current', {
        'packages': ['geochart'],
        'mapsApiKey': 'AIzaSyBKIZnOIhiGKMQ6Mm1I68LfrViSD5BI5vo'
        // You can add additional parameters here if needed
      });
      google.charts.setOnLoadCallback(this.drawRegionsMap.bind(this));
    } else {
      console.error('Google Charts API not loaded');
    }
  }

  drawRegionsMap() {
    const data = google.visualization.arrayToDataTable([
      ['Region', 'Voters'],
      ['Ashanti', 0],
      ['Brong-Ahafo', 0],
      ['Central', 0],
      ['Eastern', 0],
      ['Greater Accra', 0],
      ['Northern', 0],
      ['Upper East', 0],
      ['Upper West', 0],
      ['Volta', 0],
      ['Western', 0],
      ['Western North', 0],
      ['Bono', 0],
      ['Oti', 0],
      ['North East', 0],
      ['Savannah', 0],
      ['Ahafo', 0]
    ]);

    const options = {
      region: 'GH',
      displayMode: 'regions',
      datalessRegionColor: '#fff',
      resolution: 'provinces',
      // colorAxis: { colors: ['#FFD700', '#FF0000'] }
    };

    const chart = new google.visualization.GeoChart(this.chartElement.nativeElement);
    chart.draw(data, options);
  }

}
