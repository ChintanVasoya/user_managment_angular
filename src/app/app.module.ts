import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './auth/header/header.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialExampleModule } from '././matireal.module';

import {
  OwlDateTimeModule,
  OWL_DATE_TIME_LOCALE,
  OWL_DATE_TIME_FORMATS,
  DateTimeAdapter, OwlNativeDateTimeModule
} from '@danielmoncada/angular-datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';


export const MY_MOMENT_FORMATS = {
  parseInput: 'DD-MM-YYYY hh:mm A',
  fullPickerInput: 'DD-MM-YYYY hh:mm A',
  datePickerInput: 'DD-MM-YYYY',
  timePickerInput: 'hh:mm A',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'DD-MM-YYYY',
  monthYearA11yLabel: 'MMM YYYY',
};

import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UserlistComponent } from './dashboard/userlist/userlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserlistComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    DropzoneModule,
    NgxDropzoneModule,
    MatPaginatorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatNativeDateModule,
    MaterialExampleModule,
    MatSortModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
  ],
  exports : [
    MatPaginatorModule,
    HeaderComponent,
      MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule
  ],
  providers: [
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
  ],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
