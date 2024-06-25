import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { Region } from 'src/app/models/region';
import { Ward } from 'src/app/models/ward';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrls: ['./ward-list.component.css']
})
export class WardListComponent implements OnInit {

  wardList!: Ward[];
  wardListFull!: Ward[];
  regionList: Region[] = [];
  constituencyList: Constituency[] = [];
  pageSize: number = 5;
  totalItems: number = 0;
  pageNumber: number = 1;

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchRegionList();
    this.fetchWardList();
  }

  fetchWardList(): void {
    this._service.getWardList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.wardListFull = response.data?.wards;
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

  loadConstituencyByRegion(regionId: string = ''): void {
    if (!regionId) {
      this.constituencyList = [];
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

  filterWardByRegion(event: Event): void {
    const regionId: string = (event.target as HTMLSelectElement).value;
    this.loadConstituencyByRegion(regionId);
    this.getData(regionId);
  }

  filterWardByConstituency(event: Event): void {
    const constituencyId: string = (event.target as HTMLSelectElement).value;
    this.getData('', constituencyId);
  }

  getData(regionId: string = '', constituencyId: string = '') {
    let filteredList: Ward[] = this.wardListFull;
    if (regionId) {
      filteredList = this.wardListFull
        .filter((ward: Ward) => ward.region._id === regionId)
    }
    if (constituencyId) {
      filteredList = filteredList
        .filter((ward: Ward) => ward.constituency._id === constituencyId)
    }
    if (!regionId && !constituencyId) {
      this.wardList = this.wardListFull
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
      this.totalItems = this.wardListFull.length;
    } else {
      this.wardList = filteredList
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
      this.totalItems = filteredList.length;
    }
  }

  addNewWard() {
    this._router.navigateByUrl('/admin/ward/create');
  }

  editWard(ward: Ward) {
    this._router.navigateByUrl('/admin/ward/create/' + ward._id);
  }

  deleteWard(ward: Ward) {
    this._service.deleteWard(ward._id)
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        if (response.success) {
          this._service.showSuccess('Success', 'Ward deleted successfully');
          this.fetchWardList();
        }
      });
  }

}
