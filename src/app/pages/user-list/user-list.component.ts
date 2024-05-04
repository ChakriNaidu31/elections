import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Constituency } from 'src/app/models/constituency';
import { User } from 'src/app/models/user';
import { BallotAccessService } from 'src/app/services/ballot-access.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {
  userList!: User[];
  userListFull!: User[];
  constituencyList: Constituency[] = [];
  roleList = [
    { key: 'SUPER_ADMIN', value: 'Super Admin' },
    { key: 'ADMIN', value: 'Admin' },
    { key: 'RETUNRING_OFFICER', value: 'Returning Officer' },
    { key: 'POLLING_OFFICER', value: 'Polling Officer' }
  ];
  pageSize: number = 5;
  totalItems: number = 0;
  pageNumber: number = 1;

  constructor(private _service: BallotAccessService, private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchConstituencyList();
    this.fetchUserList();
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

  filterByRole(event: Event): void {
    const roleName: string = (event.target as HTMLSelectElement).value;
    this.getData('', roleName);
  }

  filterByConstituency(event: Event): void {
    const constituencyId: string = (event.target as HTMLSelectElement).value;
    this.getData('', '', constituencyId);
  }

  filterByName(event: Event): void {
    const name: string = (event.target as HTMLInputElement).value;
    this.getData(name);
  }

  getData(name: string = '', role: string = '', constituencyId: string = '') {
    let filteredList: User[] = this.userListFull;
    if (name) {
      filteredList = filteredList
        .filter((user: User) => {
          return (user.firstName.toLowerCase().includes(name.toLowerCase()) || user.lastName.toLowerCase().includes(name.toLowerCase()));
        });
    }
    if (role) {
      filteredList = filteredList
        .filter((user: User) => user.role === role);
    }
    if (constituencyId) {
      filteredList = filteredList
        .filter((user: User) => user.station?.constituency?._id === constituencyId)
    }
    if (!name && !role && !constituencyId) {
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
