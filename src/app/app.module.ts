// General main packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular-6-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Application Components
import { AppComponent } from './app.component';
import { LoginComponent } from './component/authentication/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { ArticleTaskComponent } from './component/tasks/articletask.component';
import { FieldErrorDisplayComponent } from './component/tasks/article-display-error';

// Routes
import { ROUTING } from './component/app.routes';

// Model Services
import { AuthenticationService } from './component/authentication/authentication.service';
import { DashDataService } from './component/dashboard/dashdata.service';
import { PassTaskDetailService } from './component/tasks/passtaskdetail.service';
import { UploadFileService } from './component/tasks/file.service';

// state management
import { StoreModule } from '@ngrx/store';
import { reducer, reducerOne } from './reducer/wms.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ArticleTaskComponent,
    FieldErrorDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
    ROUTING,
    NgbModule,
    StoreModule.forRoot({
      wms: reducer,
      wmsUser: reducerOne
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    AuthenticationService,
    DashDataService,
    PassTaskDetailService,
    UploadFileService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
