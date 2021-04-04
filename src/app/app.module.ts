/**
 * ## AppModule
 * @packageDocumentation
 * @module AppModule
 * @preferred
 */
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from '@app/_helpers';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from '@app/_interceptors';
import { HomeComponent } from '@app/home';
import { LoginComponent } from '@app/login';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DtTableModule } from 'ngx-dt-table';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ResumeViewComponent } from './resume-view/resume-view.component';
import { PerfectPhonePipe } from './_pipes/perfect-phone.pipe';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

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
        NgxSkeletonLoaderModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
,
        ResumeViewComponent ,
        PerfectPhonePipe   ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'ru' },
        // Пока что фейковый бекенд
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

/**
 * ## Главный модуль
 */
export class AppModule { }
