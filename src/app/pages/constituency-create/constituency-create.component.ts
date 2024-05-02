import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Region } from 'src/app/models/region';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-constituency-create',
  templateUrl: './constituency-create.component.html',
  styleUrls: ['./constituency-create.component.css']
})
export class ConstituencyCreateComponent implements OnInit {

  constituencyForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    region: ['', Validators.required]
  });
  pageTitle: string = "Add New Constituency";
  regionList: Region[] = [];

  constructor(private _service: BallotAccessService, private _fb: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchRegionList();
    const constituencyId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (constituencyId) {
      this.pageTitle = "Edit Constituency";
      this._service.getConstituencyById(constituencyId)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.constituencyForm.patchValue(response?.data?.constituency);
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

  createConstituency() {
    const constituencyId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
    if (constituencyId) {
      this._service.updateConstituency(constituencyId, this.constituencyForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.constituencyForm.reset();
          this._service.showSuccess('Success', 'Constituency updated successfully');
          this._router.navigateByUrl('/admin/constituency');
        });
    } else {
      this._service.createConstituency(this.constituencyForm.value)
        .pipe(catchError((error) => {
          this._service.showError(error.error?.error?.message);
          return '';
        }))
        .subscribe((response: any) => {
          this.constituencyForm.reset();
          this._service.showSuccess('Success', 'Constituency created successfully');
          this._router.navigateByUrl('/admin/constituency');
        });
    }
  }

  redirectToList() {
    this._router.navigateByUrl('/admin/constituency');
  }

}
