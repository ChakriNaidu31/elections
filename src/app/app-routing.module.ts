import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { PollingstationListComponent } from './pages/pollingstation-list/pollingstation-list.component';
import { PollingstationCreateComponent } from './pages/pollingstation-create/pollingstation-create.component';
import { ConstituencyCreateComponent } from './pages/constituency-create/constituency-create.component';
import { ConstituencyListComponent } from './pages/constituency-list/constituency-list.component';
import { RegionListComponent } from './pages/region-list/region-list.component';
import { RegionCreateComponent } from './pages/region-create/region-create.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { DataUploadComponent } from './pages/data-upload/data-upload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollingStatementComponent } from './pages/polling-statement/polling-statement.component';
import { PollingStatementDetailsComponent } from './pages/polling-statement-details/polling-statement-details.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { authGuard } from './services/auth.guard';
import { WardListComponent } from './pages/ward-list/ward-list.component';
import { WardCreateComponent } from './pages/ward-create/ward-create.component';
import { ElectionsListComponent } from './pages/elections-list/elections-list.component';
import { ElectionsDetailsComponent } from './pages/elections-details/elections-details.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { ResultComponent } from './pages/result/result.component';
import { ResultEntryComponent } from './pages/result-entry/result-entry.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'user/set-password', component: SetPasswordComponent },
  {
    path: 'admin', children: [
      {
        path: 'station', children: [
          { path: '', component: PollingstationListComponent },
          { path: 'create', component: PollingstationCreateComponent },
          { path: 'create/:id', component: PollingstationCreateComponent },
        ],
      },
      {
        path: 'constituency', children: [
          { path: '', component: ConstituencyListComponent },
          { path: 'create', component: ConstituencyCreateComponent },
          { path: 'create/:id', component: ConstituencyCreateComponent },
        ],
      },
      {
        path: 'ward', children: [
          { path: '', component: WardListComponent },
          { path: 'create', component: WardCreateComponent },
          { path: 'create/:id', component: WardCreateComponent },
        ],
      },
      {
        path: 'region', children: [
          { path: '', component: RegionListComponent },
          { path: 'create', component: RegionCreateComponent },
          { path: 'create/:id', component: RegionCreateComponent },
        ],
      },
      {
        path: 'user', children: [
          { path: '', component: UserListComponent },
          { path: 'create', component: UserCreateComponent },
          { path: 'create/admin', component: UserCreateComponent },
        ],
      },
      {
        path: 'elections', children: [
          { path: '', component: ElectionsListComponent },
          { path: 'create', component: ElectionsDetailsComponent },
          { path: 'create/:id', component: ElectionsDetailsComponent },
        ],
      }
    ],
    canActivate: [authGuard],
    canActivateChild: [authGuard]
  },
  {
    path: 'statement', children: [
      { path: '', component: PollingStatementComponent },
      { path: ':id', component: PollingStatementComponent },
      { path: 'details/:id', component: PollingStatementDetailsComponent },
    ],
    canActivate: [authGuard],
    canActivateChild: [authGuard]
  },
  {
    path: 'result', children: [
      { path: '', component: ResultComponent },
      { path: 'entry', component: ResultEntryComponent }
    ],
    canActivate: [authGuard],
    canActivateChild: [authGuard]
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'dataupload', component: DataUploadComponent, canActivate: [authGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
