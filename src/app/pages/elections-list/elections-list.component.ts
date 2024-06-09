import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Election } from 'src/app/models/election';
import { BallotAccessService } from 'src/app/services/ballot-access.service';

@Component({
  selector: 'app-elections-list',
  templateUrl: './elections-list.component.html',
  styleUrls: ['./elections-list.component.css']
})
export class ElectionsListComponent implements OnInit {

  electionList!: Election[];

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchElectionList();
  }

  fetchElectionList(): void {
    this._service.getElectionList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.electionList = response.data?.elections;
      });
  }

  addNewElection() {
    this._router.navigateByUrl('/admin/elections/create');
  }

  editElection(election: Election) {
    this._router.navigateByUrl('/admin/elections/create/' + election.unique);
  }

  activateElection(election: Election) {
    this._service.activateElection(election._id)
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        if (response.success) {
          this._service.showSuccess('Success', 'Election activated successfully');
          this.fetchElectionList();
        }
      });
  }

}
