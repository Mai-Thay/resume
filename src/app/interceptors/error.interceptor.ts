/**
 * @packageDocumentation
 * @module Interceptors
 */
import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '@app/services';
import {Router} from '@angular/router';

/** ## ErrorInterceptor
 * Перехватывает ошибки в ответах от сервера
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
      const error = err.error?.message || 'error';
      return throwError(error);
    }));
  }
}
