/**
 * ## AppModule
 * @packageDocumentation
 * @module AppModule
 * @preferred
 */
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from '@app/app.component';
import {AppRoutingModule} from '@app/app-routing.module';
import {CookieInterceptor, ErrorInterceptor} from '@app/interceptors';
import {ResumeListComponent} from '@app/resume-list';
import {LoginComponent} from '@app/login';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DtTableModule} from 'ngx-dt-table';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ResumeViewComponent} from '@app/resume-view';
import {PerfectPhonePipe} from '@app/pipes';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {ResumeEditComponent} from '@app/resume-edit';
import {NgxMaskModule} from 'ngx-mask';
import {HeaderComponent, DatePickerComponent} from '@app/components';


registerLocaleData(localeRu);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    DtTableModule,
    NgbModule,
    NgbPaginationModule,
    NgxSkeletonLoaderModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ResumeListComponent,
    LoginComponent,
    ResumeViewComponent,
    PerfectPhonePipe,
    ResumeEditComponent,
    DatePickerComponent,
    HeaderComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'ru'},
  ],
  bootstrap: [AppComponent]
})

/**
 * ## Главный модуль
 */
export class AppModule {
}
