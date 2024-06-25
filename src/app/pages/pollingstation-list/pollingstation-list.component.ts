import { Component, OnInit } from '@angular/core';
import { Ward } from 'src/app/models/ward';
import { Region } from 'src/app/models/region';
import { Constituency } from 'src/app/models/constituency';
import { BallotAccessService } from 'src/app/services/ballot-access.service';
import { Router } from '@angular/router';
import { PollingStation } from 'src/app/models/polling-station';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-pollingstation-list',
  templateUrl: './pollingstation-list.component.html',
  styleUrls: ['./pollingstation-list.component.css']
})



export class PollingstationListComponent implements OnInit {

  stationListFull!: PollingStation[];
  stationList!: PollingStation[];
  regionList: Region[] = [];
  constituencyList: Constituency[] = [];
  wardList: Ward[] = [];
  pageSize: number = 5;
  totalItems: number = 0;
  pageNumber: number = 1;

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchRegionList();
    this.fetchStationList();
  }

  fetchStationList(): void {
    this._service.getPollingStationList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.stationListFull = response.data?.stations;
        this.totalItems = response.meta?.totalItems;
        this.getData();
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

  loadConstituency(regionId: string = ''): void {
    if (!regionId) {
      this.constituencyList = [];
      this.wardList = [];
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

  loadWard(constituencyId: string = ''): void {
    if (!constituencyId) {
      this.wardList = [];
      return;
    } else {
      this._service.getWardList()
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          const wards = response.data?.wards;
          this.wardList = wards.filter((ward: Ward) => ward.constituency._id === constituencyId);
        });
    }
  }

  filterStationByRegion(event: Event): void {
    const regionId: string = (event.target as HTMLSelectElement).value;
    this.loadConstituency(regionId);
    this.getData(regionId);
  }

  filterStationByConstituency(event: Event): void {
    const constituencyId: string = (event.target as HTMLSelectElement).value;
    this.loadWard(constituencyId);
    this.getData('', constituencyId);
  }

  filterStationByWard(event: Event): void {
    const wardId: string = (event.target as HTMLSelectElement).value;
    this.getData('', '', wardId);
  }

  getData(regionId: string = '', constituencyId: string = '', wardId: string = '') {
    let filteredList: PollingStation[] = this.stationListFull;
    if (regionId) {
      filteredList = this.stationListFull
        .filter((station: PollingStation) => station.region._id === regionId)
    }
    if (constituencyId) {
      filteredList = filteredList
        .filter((station: PollingStation) => station.constituency._id === constituencyId)
    }
    if (wardId) {
      filteredList = filteredList
        .filter((station: PollingStation) => station.ward._id === wardId)
    }
    if (!regionId && !constituencyId && !wardId) {
      this.stationList = this.stationListFull
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
      this.totalItems = this.stationListFull.length;
    } else {
      this.stationList = filteredList
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
      this.totalItems = filteredList.length;
    }
  }

  addNewStation() {
    this._router.navigateByUrl('/admin/station/create');
  }

  editStation(station: PollingStation) {
    this._router.navigateByUrl('/admin/station/create/' + station._id);
  }

  deleteStation(station: PollingStation) {
    this._service.deletePollingStation(station._id)
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        if (response.success) {
          this._service.showSuccess('Success', 'Polling station deleted successfully');
          this.fetchStationList();
        }
      });
  }
}
