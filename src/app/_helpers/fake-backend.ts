import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import {users} from '../_mocks';
import {Role} from '../_enums';
import {User} from '../_models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(): Observable<HttpEvent<any>> {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    return next.handle(request);
            }
        }

        function authenticate(): Observable<HttpEvent<any>>  {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) {
              return error('Username or password is incorrect');
            }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: `fake-jwt-token-${user.id}`
            });
        }

        function getUsers(): Observable<HttpEvent<any>> {
            if (!isAdmin()) {
              return unauthorized();
            }
            return ok(users);
        }

        function getUserById(): Observable<HttpEvent<any>> {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            // only admins can access other user records
            if (!isAdmin() && currentUser().id !== idFromUrl()) {
                return unauthorized();
            }

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function isAdmin(): boolean {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function currentUser(): User | null {
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
