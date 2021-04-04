/**
 * ## AppRoutingModule
 * @packageDocumentation
 * @module AppRoutingModule
 * @preferred
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@app/home';
import { LoginComponent } from '@app/login';
import { AuthGuard } from '@app/_guards';
import { ResumeViewComponent } from '@app/resume-view/resume-view.component';

/**
 * ## Определение маршрутизации в приложении
 * [[include:16.md]]
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {title: 'Список резюме'}
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
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
