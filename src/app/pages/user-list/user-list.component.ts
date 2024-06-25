import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { Region } from 'src/app/models/region';
import { User } from 'src/app/models/user';
import { BallotAccessService } from 'src/app/services/ballot-access.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {

  regionList: Region[] = [];
  userList!: User[];
  userListFull!: User[];
  constituencyList: Constituency[] = [];
  roleList = [
    { key: 'SUPER_ADMIN', value: 'Super Admin' },
    { key: 'ADMIN', value: 'Admin' },
    { key: 'RETURNING_OFFICER', value: 'Returning Officer' },
    { key: 'POLLING_OFFICER', value: 'Polling Officer' }
  ];
  pageSize: number = 5;
  totalItems: number = 0;
  pageNumber: number = 1;
  regionId: string = '';
  constituencyId: string = '';
  selectedName: string = '';
  selectedRole: string = '';

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchRegionList();
    this.fetchUserList();
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

  fetchUserList(): void {
    this._service.getUserList()
      .pipe(catchError((error) => {
        this._service.showError(error.error?.error?.message);
        return '';
      }))
      .subscribe((response: any) => {
        this.userListFull = response.data?.users;
        this.totalItems = response.meta?.totalItems;
        this.getData();
      });
  }

  loadConstituencyByRegion(regionId: string = ''): void {
    if (!regionId) {
      this.constituencyList = [];
      this.constituencyId = '';
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

  filterByRegion(event: Event): void {
    this.regionId = (event.target as HTMLSelectElement).value;
    this.loadConstituencyByRegion(this.regionId);
    this.getData();
  }

  filterByRole(event: Event): void {
    this.selectedRole = (event.target as HTMLSelectElement).value;
    this.getData();
  }

  filterByConstituency(event: Event): void {
    this.constituencyId = (event.target as HTMLSelectElement).value;
    this.getData();
  }

  filterByName(event: Event): void {
    this.selectedName = (event.target as HTMLInputElement).value;
    this.getData();
  }

  getData() {
    let filteredList: User[] = this.userListFull;
    if (this.selectedName) {
      filteredList = filteredList
        .filter((user: User) => {
          return (user.firstName.toLowerCase().includes(this.selectedName.toLowerCase()) || user.lastName.toLowerCase().includes(this.selectedName.toLowerCase()));
        });
    }
    if (this.selectedRole) {
      filteredList = filteredList
        .filter((user: User) => user.role === this.selectedRole);
    }
    if (this.regionId) {
      filteredList = this.userListFull
       .filter((user: User) => user.station?.region?._id === this.regionId);
    }
    if (this.constituencyId) {
      filteredList = filteredList
        .filter((user: User) => user.station?.constituency?._id === this.constituencyId)
    }
    if (!this.selectedName && !this.selectedRole && !this.regionId && !this.constituencyId) {
      this.userList = this.userListFull
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
      this.totalItems = this.userListFull.length;
    } else {
      this.userList = filteredList
        .slice((this.pageNumber - 1) * this.pageSize, (this.pageNumber - 1) * this.pageSize + this.pageSize);
      this.totalItems = filteredList.length;
    }
  }

  getRoleNameFromRole(role: string) {
    let roleName: string = '';
    this.roleList.forEach((element: any) => {
      if (element.key === role) {
        roleName = element.value;
      }
    });
    return roleName;
  }

  addNewUser() {
    this._router.navigateByUrl('/admin/user/create');
  }

  activateUser(user: User) {
    // TODO:
  }

  viewUser(user: User) {
    // TODO:
  }

  deactivateUser(user: User) {
    // this._service.deleteWard(ward._id)
    //   .pipe(catchError((error) => {
    //     this._service.showError(error.error?.error?.message);
    //     return '';
    //   }))
    //   .subscribe((response: any) => {
    //     if (response.success) {
    //       this._service.showSuccess('Success', 'Ward deleted successfully');
    //       this.fetchWardList();
    //     }
    //   });
    // TODO
  }
}
