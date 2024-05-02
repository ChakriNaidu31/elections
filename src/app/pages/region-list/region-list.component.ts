import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { BallotAccessService } from 'src/app/services/ballot-access.service';
import { Region } from 'src/app/models/region';
import { Router } from '@angular/router';


@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})


export class RegionListComponent implements OnInit {

  regionList!: Region[];
  regionListFull!: Region[];
  pageSize: number = 5;
  totalItems: number = 0;
  pageNumber: number = 1;

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchRegionList();
  }

  fetchRegionList(): void {
    this._service.getRegionList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.regionListFull = response.data?.regions;
        this.totalItems = response.meta?.totalItems;
        this.getData();
      });
  }

  getData() {
    this.regionList = this.regionListFull
      .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
  }

  addNewRegion() {
    this._router.navigateByUrl('/admin/region/create');
  }

  editRegion(region: Region) {
    this._router.navigateByUrl('/admin/region/create/' + region._id);
  }

  deleteRegion(region: Region) {
    this._service.deleteRegion(region._id)
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        if (response.success) {
          this._service.showSuccess('Success', 'Region deleted successfully');
          this.fetchRegionList();
        }
      });
  }

}
