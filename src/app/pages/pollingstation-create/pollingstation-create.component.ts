import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { Region } from 'src/app/models/region';
import { Ward } from 'src/app/models/ward';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-pollingstation-create',
  templateUrl: './pollingstation-create.component.html',
  styleUrls: ['./pollingstation-create.component.css']
})
export class PollingstationCreateComponent {

  stationForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    region: ['', Validators.required],
    constituency: ['', Validators.required],
    ward: ['', Validators.required]
  });
  pageTitle: string = "Add New Polling Station";
  regionList: Region[] = [];
  constituencyList: Constituency[] = [];
  wardList: Ward[] = [];

  constructor(private _service: BallotAccessService, private _fb: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchRegionList();
    const stationId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (stationId) {
      this.pageTitle = "Edit Polling Station";
      this._service.getPollingStationById(stationId)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.stationForm.patchValue(response?.data?.station);
          this.stationForm.controls['region'].setValue(response?.data?.station?.region?._id);
          this.loadConstituencyAndWardsByRegion(response?.data?.station?.region?._id, response?.data?.station?.constituency?._id);
          this.stationForm.controls['constituency'].setValue(response?.data?.station?.constituency?._id);
          this.stationForm.controls['ward'].setValue(response?.data?.station?.ward?._id);
        });
    }
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

  loadConstituency(event: Event): void {
    const regionId: string = (event.target as HTMLSelectElement).value;
    this.stationForm.controls['constituency'].setValue('');
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

  loadWard(event: Event): void {
    const constituencyId: string = (event.target as HTMLSelectElement).value;
    this.stationForm.controls['ward'].setValue('');
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

  loadConstituencyAndWardsByRegion(regionId: string, constituencyId: string): void {
    this._service.getConstituencyList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        const constituencies = response.data?.constituencies;
        this.constituencyList = constituencies.filter((constituency: Constituency) => constituency.region._id === regionId);
      });

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

  createStation() {
    const stationId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (stationId) {
      this._service.updatePollingStation(stationId, this.stationForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.stationForm.reset();
          this._service.showSuccess('Success', 'Polling station updated successfully');
          this._router.navigateByUrl('/admin/station');
        });
    } else {
      this._service.createPollingStation(this.stationForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.stationForm.reset();
          this._service.showSuccess('Success', 'Polling station created successfully');
          this._router.navigateByUrl('/admin/station');
        });
    }
  }

  redirectToList() {
    this._router.navigateByUrl('/admin/station');
  }

}
