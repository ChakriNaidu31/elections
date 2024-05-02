import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { Region } from 'src/app/models/region';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-ward-create',
  templateUrl: './ward-create.component.html',
  styleUrls: ['./ward-create.component.css']
})
export class WardCreateComponent implements OnInit {

  wardForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    code: [''],
    location: [''],
    region: ['', Validators.required],
    constituency: ['', Validators.required]
  });
  pageTitle: string = "Add New Ward";
  regionList: Region[] = [];
  constituencyList: Constituency[] = [];

  constructor(private _service: BallotAccessService, private _fb: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchRegionList();
    const wardId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (wardId) {
      this.pageTitle = "Edit Ward";
      this._service.getWardById(wardId)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.wardForm.patchValue(response?.data?.ward);
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
    this.wardForm.controls['constituency'].setValue('');
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

  createWard() {
    const wardId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (wardId) {
      this._service.updateWard(wardId, this.wardForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.wardForm.reset();
          this._service.showSuccess('Success', 'Ward updated successfully');
          this._router.navigateByUrl('/admin/ward');
        });
    } else {
      this._service.createWard(this.wardForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.wardForm.reset();
          this._service.showSuccess('Success', 'Ward created successfully');
          this._router.navigateByUrl('/admin/ward');
        });
    }
  }

  redirectToList() {
    this._router.navigateByUrl('/admin/ward');
  }

}
