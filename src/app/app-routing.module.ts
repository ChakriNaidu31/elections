import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'pollingstationlist', component: PollingstationListComponent },
  { path: 'pollingstationcreate', component: PollingstationCreateComponent },
  { path: 'constituencycreate', component: ConstituencyCreateComponent },
  { path: 'constituencylist', component: ConstituencyListComponent },
  { path: 'regionlist', component: RegionListComponent },
  { path: 'regioncreate', component: RegionCreateComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'usercreate', component: UserCreateComponent },
  { path: 'dataupload', component: DataUploadComponent },
  { path: 'pollingstatement', component: PollingStatementComponent },
  { path: 'pollingstatementdetails', component: PollingStatementDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
