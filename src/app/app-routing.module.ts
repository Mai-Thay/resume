/**
 * ## AppRoutingModule
 * @packageDocumentation
 * @module AppRoutingModule
 * @preferred
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResumeListComponent} from '@app/resume-list';
import {LoginComponent} from '@app/login';
import {AuthGuard} from '@app/_guards';
import {ResumeViewComponent} from '@app/resume-view/resume-view.component';
import {ResumeEditComponent} from '@app/resume-edit/resume-edit.component';
import {Role} from '@app/_enums';

/**
 * ## Определение маршрутизации в приложении
 */
const routes: Routes = [
  {
    path: 'list',
    component: ResumeListComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Список резюме',
      roles: [Role.Admin]
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      colored: true,
    }
  },
  {
    path: 'resume/:id',
    component: ResumeViewComponent,
    canActivate: [AuthGuard],
    data: {title: 'Просмотр резюме'}
  },
  {
    path: 'resume',
    component: ResumeEditComponent,
    canActivate: [AuthGuard],
    data: {title: 'Мое резюме'}
  },
  // otherwise redirect to home
  {path: '**', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
