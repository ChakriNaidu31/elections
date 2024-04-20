import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { PollingstationListComponent } from './pages/pollingstation-list/pollingstation-list.component';
import { PollingstationCreateComponent } from './pages/pollingstation-create/pollingstation-create.component';
import { ConstituencyListComponent } from './pages/constituency-list/constituency-list.component';
import { ConstituencyCreateComponent } from './pages/constituency-create/constituency-create.component';
import { RegionCreateComponent } from './pages/region-create/region-create.component';
import { RegionListComponent } from './pages/region-list/region-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { DataUploadComponent } from './pages/data-upload/data-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgbdSortableHeader } from './services/sortable.directive';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent,
    PollingstationListComponent,
    PollingstationCreateComponent,
    ConstituencyListComponent,
    ConstituencyCreateComponent,
    RegionCreateComponent,
    RegionListComponent,
    UserListComponent,
    UserCreateComponent,
    DataUploadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,HttpClientModule,
    NgbdSortableHeader
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
