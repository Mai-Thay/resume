/**
 * @packageDocumentation
 * @module Helpers
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {users, resumes, profiles, tags} from '../_mocks';
import {Role} from '../_enums';

/**
 * ## Tут всеми силами стараемся симулировать бекенд, ибо пока его нет
 * [[include:15.md]]
 */

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

    /**
     * Обработка урлов входящих хапросов
     */
    function handleRoute(): Observable<HttpEvent<any>> {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/users') && method === 'GET':
                return getUsers();
            case url.match(/\/users\/\d+$/) && method === 'GET':
                return getUserById();
            case url.match('/tags') && method === 'GET':
                return getTags();
            case url.match('/profiles') && method === 'GET':
              return getProfiles();
          case url.match('/resumes') && method === 'GET':
            return getResumesList();
            default:
                return next.handle(request);
        }
    }

    /**
     * Авторизация
     * @method POST
     */
    function authenticate(): Observable<HttpEvent<any>>  {
        const { username, password } = body;
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) {
          return error('Не корректные логин или пароль');
        }
        return ok({
            id: user.id,
            username: user.username,
            role: user.role,
            token: `fake-jwt-token-${user.id}`
        });
    }

    /**
     * Получение списка резюме
     * @method GET
     */
    function getResumesList(): Observable<HttpEvent<any>> {
      const result = {
        total: resumes.length,
        page: Number(request.params.get('page')) || 1,
        perPage: Number(request.params.get('perPage')) || resumes.length,
        items: []
      };

      if (!isAdmin()) {
        return unauthorized();
      }

      result.items = resumes.slice((result.page - 1) * result.perPage, result.perPage * result.page).map(e => ({
        ...e,
        user: users.find(x => x.id === e.userId),
        tags: tags.filter(x => e.tagsId.includes(x.id)),
        profile: profiles.find(x => x.id === e.profileId)
      }));

      return ok(result);
    }

    /**
     * Получение списка пользователей
     * @method GET
     */
    function getUsers(): Observable<HttpEvent<any>> {
      if (!isAdmin()) {
        return unauthorized();
      }
      return ok(users);
    }

    /**
     * Получение списка тегов
     * @method GET
     */
    function getTags(): Observable<HttpEvent<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(tags);
    }

    /**
     * Получение списка направлений
     * @method GET
     */
    function getProfiles(): Observable<HttpEvent<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(profiles);
    }

    /**
     * Получение пользователя по ID
     * @method GET
     */
    function getUserById(): Observable<HttpEvent<any>> {
      if (!isLoggedIn()) {
          return unauthorized();
      }

      if (!isAdmin() && currentUser().id !== idFromUrl()) {
          return unauthorized();
      }
      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    /**
     * Проверка является ли пользователь адимнистратором
     */
    function isAdmin(): boolean {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    /**
     * Получение информации по текущему (авторизованному пользователю)
     */
    function currentUser(): {id: number, role: string} {
      if (!isLoggedIn()) {
        return;
      }
      // tslint:disable-next-line:radix
      const id = parseInt(headers.get('Authorization').split('-').reverse()[0]);
      return users.find(x => x.id === id);
    }

    // tslint:disable-next-line:no-shadowed-variable
    function ok(body: object | null): Observable<HttpEvent<any>> {
        return of(new HttpResponse({ status: 200, body }));
    }

    function error(message): Observable<never> {
        return throwError({ error: { message } });
    }

    function unauthorized(): Observable<never> {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn(): boolean {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function idFromUrl(): number {
      const urlParts = url.split('/');
      // tslint:disable-next-line:radix
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
