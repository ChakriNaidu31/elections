import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { Region } from 'src/app/models/region';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
    selector: 'app-elections-details',
    templateUrl: './elections-details.component.html',
    styleUrls: ['./elections-details.component.css']
})
export class ElectionsDetailsComponent implements OnInit {

    electionForm: FormGroup = this._fb.group({
        electionName: ['', Validators.required],
        electionDate: ['', Validators.required],
        commissionName: ['', Validators.required],
        commissionLogo: [''],
        region: [''],
        constituency: ['']
    });
    candidatesForm: FormGroup = this._fb.group({
        name: ['', Validators.required],
        partyName: ['', Validators.required],
        partySymbol: ['', Validators.required]
    });
    candidates: any[] = [];
    pageTitle: string = "Add New Election";
    regionList: Region[] = [];
    constituencyList: Constituency[] = [];

    constructor(private _service: BallotAccessService, private _fb: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.fetchRegionList();
        this.fetchConstituencyList();
        const electionId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
        if (electionId) {
            this.pageTitle = "Edit Election";
            this._service.getElectionDetails(electionId)
                .pipe(catchError((error) => {
                    this._service.showError(error.error?.error?.message);
                    return '';
                }))
                .subscribe((response: any) => {
                    this.electionForm.patchValue(response?.data?.election);
                });
        }
    }

    createElection() {
        if (!this.candidates || !this.candidates.length) {
            this._service.showError("Please add at least one candidate");
            return;
        }
        const electionId: string = this._activatedRoute.snapshot.paramMap.get('id') || '';
        if (electionId) {
            this._service.updateElection(electionId, { ...this.electionForm.value, candidates: this.candidates })
                .pipe(catchError((error) => {
                    this._service.showError(error.error?.error?.message);
                    return '';
                }))
                .subscribe((response: any) => {
                    this.electionForm.reset();
                    this._service.showSuccess('Success', 'Election updated successfully');
                    this._router.navigateByUrl('/admin/elections');
                });
        } else {
            this._service.createElection({ ...this.electionForm.value, candidates: this.candidates })
                .pipe(catchError((error) => {
                    this._service.showError(error.error?.error?.message);
                    return '';
                }))
                .subscribe((response: any) => {
                    this.electionForm.reset();
                    this._service.showSuccess('Success', 'Election created successfully');
                    this._router.navigateByUrl('/admin/elections');
                });
        }
    }

    redirectToList() {
        this._router.navigateByUrl('/admin/elections');
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

    fetchConstituencyList(): void {
        this._service.getConstituencyList()
            .pipe(catchError((error) => {
                this._service.showError(error.error?.error?.message);
                return '';
            }))
            .subscribe((response: any) => {
                this.constituencyList = response.data?.constituencies;
            });
    }

    loadConstituency(event: Event): void {
        const regionId: string = (event.target as HTMLSelectElement).value;
        this.electionForm.controls['constituency'].setValue('');
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

    addCandidate() {
        if (this.candidatesForm.valid) {
            this.candidates.push(this.candidatesForm.value);
            this.candidatesForm.reset();
        }
    }

    deleteCandidate(candidate: any) {
        // this.candidates.splice(index, 1);
        let candidateIndex: number = this.candidates.indexOf(candidate);
        if (candidateIndex !== -1) {
            this.candidates.splice(candidateIndex, 1);
            this.candidatesForm.reset();
        }
    }


}
