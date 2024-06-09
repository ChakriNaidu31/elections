import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    if (typeof google !== 'undefined' && google.charts) {
      google.charts.load('current', {
        'packages': ['geochart'],
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
      ['Greater Accra', 5000000],
      ['Ashanti', 5500000],
      ['Western', 2800000],
      ['Eastern', 2700000],
      ['Central', 2400000],
      ['Northern', 2100000],
      ['Volta', 1900000],
      ['Upper East', 1100000],
      ['Upper West', 900000],
      ['Brong-Ahafo', 2200000],
      ['Western North', 1200000],
      ['Oti', 800000],
      ['North East', 700000],
      ['Savannah', 600000],
      ['Ahafo', 500000]
    ]);

    const options = {
      region: 'GH',
      displayMode: 'regions',
      resolution: 'provinces',
      colorAxis: { colors: ['#FFD700', '#FF0000'] }
    };

    const chart = new google.visualization.GeoChart(this.chartElement.nativeElement);

    chart.draw(data, options);
  }

}
