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

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'navbar', component: NavbarComponent},
  { path: 'pollingstationlist', component: PollingstationListComponent},
  { path: 'pollingstationcreate', component: PollingstationCreateComponent},
  { path: 'constituencycreate', component: ConstituencyCreateComponent},
  { path: 'constituencylist', component: ConstituencyListComponent},
  { path: 'regionlist', component: RegionListComponent},
  { path: 'regioncreate', component: RegionCreateComponent},
  { path: 'userlist', component: UserListComponent},
  { path: 'usercreate', component: UserCreateComponent},
  { path: 'dataupload', component: DataUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
