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
      ['State', 'Voters'],
      ['Andhra Pradesh', 10000000],
      ['Arunachal Pradesh', 2000000],
      ['Assam', 15000000],
      ['Bihar', 25000000],
      ['Chhattisgarh', 12000000],
      ['Goa', 1000000],
      ['Gujarat', 18000000],
      ['Haryana', 9000000],
      ['Himachal Pradesh', 5000000],
      ['Jharkhand', 10000000],
      ['Karnataka', 20000000],
      ['Kerala', 15000000],
      ['Madhya Pradesh', 22000000],
      ['Maharashtra', 30000000],
      ['Manipur', 2000000],
      ['Meghalaya', 1500000],
      ['Mizoram', 1000000],
      ['Nagaland', 1200000],
      ['Odisha', 18000000],
      ['Punjab', 12000000],
      ['Rajasthan', 25000000],
      ['Sikkim', 800000],
      ['Tamil Nadu', 22000000],
      ['Telangana', 15000000],
      ['Tripura', 1500000],
      ['Uttar Pradesh', 40000000],
      ['Uttarakhand', 5000000],
      ['West Bengal', 30000000],
      ['Andaman and Nicobar Islands', 200000],
      ['Chandigarh', 500000],
      ['Dadra and Nagar Haveli and Daman and Diu', 300000],
      ['Lakshadweep', 100000],
      ['Delhi', 15000000],
      ['Puducherry', 800000],
      ['Ladakh', 200000],
      ['Dadra and Nagar Haveli', 200000],
      ['Daman and Diu', 150000]
    ]);

    const options = {
      region: 'IN',
      displayMode: 'regions',
      resolution: 'provinces',
      colorAxis: { colors: ['#FFD700', '#FF0000'] }
    };

    const chart = new google.visualization.GeoChart(this.chartElement.nativeElement);

    chart.draw(data, options);
  }

}
