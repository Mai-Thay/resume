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
        .pipe(delay(1000))
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
        case url.match('/resume') && method === 'GET':
          return getResumeById();
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
        sortBy: request.params.get('sortBy') || null,
        sortDir: request.params.get('sortDir') || null,
        tags: (request.params.getAll('tags') || []).map(e => Number(e)),
        profile: Number(request.params.get('profile')) || null,
        items: []
      };

      if (!isAdmin()) {
        return unauthorized();
      }

      let resumesCombined = resumes.map(e => {
        return {
          ...e,
          user: users.find(x => x.id === e.userId),
          tags: tags.filter(x => e.tagsId.includes(x.id)),
          profile: profiles.find(x => x.id === e.profileId)
        };
      });

      if (result.tags.length) {
        resumesCombined = resumesCombined.filter(r => {
          return !!r.tagsId.filter(e => {
            return result.tags.includes(e);
          }).length;
        });
      }

      if (result.profile) {
        resumesCombined = resumesCombined.filter(r => r.profileId === result.profile);
      }

      switch (result.sortBy) {
        case 'id':
          resumesCombined.sort((a, b) => {
            return sort(a.id, b.id, result.sortDir);
          });
          break;
        case 'fio':
          resumesCombined.sort((a, b) => {
            return sort(
              `${a.lastName} ${a.name[0]}. ${a.secondName[0]}.`,
              `${b.lastName} ${b.name[0]}. ${b.secondName[0]}.`,
              result.sortDir
            );
          });
          break;
        case 'profile':
          resumesCombined.sort((a, b) => {
            return sort(a.profile.text, b.profile.text, result.sortDir);
          });
          break;
        default:
          resumesCombined.sort((a, b) => {
            return a.id - b.id;
          });
          break;
      }

      result.total = resumesCombined.length;

      result.items = resumesCombined.slice((result.page - 1) * result.perPage, result.perPage * result.page);

      return ok(result);
    }

    /**
     * Получение резюме по id
     */
    function getResumeById(): Observable<HttpEvent<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const id = Number(request.params.get('id')) || null;
      if (id === null) { return error('Id must not be null or undefined'); }
      const resume = resumes.filter(r => r.id === id);
      if (!resume.length) { return notFound(); }

      console.log(resume)
      const prepared = {
          ...resume[0],
          user: users.find(x => x.id === resume[0]?.userId),
          tags: tags.filter(x => resume[0].tagsId?.includes(x.id)),
          profile: profiles.find(x => x.id === resume[0]?.profileId)
      };

      prepared.lanitExperience = prepared.lanitExperience?.map((l) => {
        return Object.assign({tags: tags.filter(x => l.tagsId?.includes(x.id))}, l);
      }) || null;

      return ok(prepared);
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

    function notFound(): Observable<never> {
      return throwError({ status: 404, error: { message: 'Page not found' } });
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

    function sort(a, b, dir): number {
      if ((a > b && dir === 'asc') || (a < b && dir === 'desc')) {
        return 1;
      }
      if ((a > b && dir === 'desc') || (a < b && dir === 'asc')) {
        return -1;
      }
      return 0;
    }
  }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
