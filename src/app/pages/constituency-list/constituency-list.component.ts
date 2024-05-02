import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { BallotAccessService } from 'src/app/services/ballot-access.service';
import { Router } from '@angular/router';
import { Region } from 'src/app/models/region';


@Component({
  selector: 'app-constituency-list',
  templateUrl: './constituency-list.component.html',
  styleUrls: ['./constituency-list.component.css']
})


export class ConstituencyListComponent implements OnInit {

  constituencyList!: Constituency[];
  constituencyListFull!: Constituency[];
  regionList: Region[] = [];
  pageSize: number = 5;
  totalItems: number = 0;
  pageNumber: number = 1;

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchRegionList();
    this.fetchConstituencyList();
  }

  fetchConstituencyList(): void {
    this._service.getConstituencyList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.constituencyListFull = response.data?.constituencies;
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

  filterConstituencyByRegion(event: Event): void {
    const regionId: string = (event.target as HTMLSelectElement).value;
    this.getData(regionId);
  }

  getData(regionId: string = '') {
    if (regionId) {
      this.constituencyList = this.constituencyListFull
        .filter((constituency: Constituency) => constituency.region._id === regionId)
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
        this.totalItems = this.constituencyListFull.filter((constituency: Constituency) => constituency.region._id === regionId).length
    } else {
      this.constituencyList = this.constituencyListFull
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
        this.totalItems = this.constituencyListFull.length;
    }
  }

  addNewConstituency() {
    this._router.navigateByUrl('/admin/constituency/create');
  }

  editConstituency(constituency: Constituency) {
    this._router.navigateByUrl('/admin/constituency/create/' + constituency._id);
  }

  deleteConstituency(constituency: Constituency) {
    this._service.deleteConstituency(constituency._id)
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        if (response.success) {
          this._service.showSuccess('Success', 'Constituency deleted successfully');
          this.fetchConstituencyList();
        }
      });
  }

}
