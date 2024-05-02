import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-region-create',
  templateUrl: './region-create.component.html',
  styleUrls: ['./region-create.component.css']
})
export class RegionCreateComponent implements OnInit {

  regionForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    code: ['']
  });
  pageTitle: string = "Add New Region";

  constructor(private _service: BallotAccessService, private _fb: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const regionId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (regionId) {
      this.pageTitle = "Edit Region";
      this._service.getRegionById(regionId)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.regionForm.patchValue(response?.data?.region);
        });
    }
  }

  createRegion() {
    const regionId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (regionId) {
      this._service.updateRegion(regionId, this.regionForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.regionForm.reset();
          this._service.showSuccess('Success', 'Region updated successfully');
          this._router.navigateByUrl('/admin/region');
        });
    } else {
      this._service.createRegion(this.regionForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.regionForm.reset();
          this._service.showSuccess('Success', 'Region created successfully');
          this._router.navigateByUrl('/admin/region');
        });
    }
  }

  redirectToList() {
    this._router.navigateByUrl('/admin/region');
  }
}
