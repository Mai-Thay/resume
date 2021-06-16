/**
 * @packageDocumentation
 * @module Interceptors
 */
import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {CookieService} from 'ngx-cookie-service';

/**
 * ## CookieInterceptor
 * Подставляет cookie авторизованного пользователя в запросы на сервер
 */
@Injectable()
export class CookieInterceptor implements HttpInterceptor {


  constructor(private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiLogin = request.url.startsWith(environment.apiUrl) && request.url.indexOf('login') !== -1;
    const cookie = this.cookieService.get('JSESSIONID');

    if (isApiLogin && !!cookie) {
      request = request.clone({
        withCredentials: true,
      });
    }

    return next.handle(request);
  }
}
