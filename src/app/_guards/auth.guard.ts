/**
 * @packageDocumentation
 * @module Guards
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/_services';

/**
 * ## AuthGuard
 * Ограничение достпа с маршрутам по признаку авторизованности пользователя
 * [[include:8.md]]
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.authenticationService.userValue;
        if (user) {
            if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
                this.router.navigate(['/']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
