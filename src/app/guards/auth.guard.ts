/**
 * @packageDocumentation
 * @module Guards
 */
import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '@app/services';

/**
 * ## AuthGuard
 * Ограничение доступа к маршрутам по признаку авторизованности пользователя
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  userRoles: string[];
  isAuth: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.rolesSubject.subscribe(roles => this.userRoles = roles);
    this.authenticationService.authSubject.subscribe(auth => this.isAuth = auth);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuth) {
      if (route.data.roles && !route.data.roles.filter(r => this.userRoles.includes(r)).length) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
