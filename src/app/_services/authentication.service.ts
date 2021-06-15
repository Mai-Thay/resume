/**
 * @packageDocumentation
 * @module Services
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {LoginResponse} from '@app/_models';
import {BaseService} from '@app/_services/base.service';
import {Role} from '@app/_enums';

/**
 * ## Сервис авторизации пользователя
 */
@Injectable({providedIn: 'root'})
export class AuthenticationService extends BaseService {
  public authSubject: BehaviorSubject<boolean>;
  public rolesSubject: BehaviorSubject<string[]>;

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
    this.authSubject = new BehaviorSubject<boolean>(localStorage.getItem('isAuth') === 'true');
    this.rolesSubject = new BehaviorSubject<string[]>(JSON.parse(localStorage.getItem('roles') || '[]'));
    this.addAuthSubscription();
    this.addRolesSubscription();
  }

  get userName(): string {
    return localStorage.getItem('username') || null;
  }

  get isAdmin(): boolean {
    return this.rolesSubject.getValue().includes(Role.Admin);
  }

  get userMainUrl(): string {
    if (this.isAdmin) {
      return '/list';
    } else {
      return '/edit';
    }
  }

  /**
   * Авторизация пользователя
   * @param username стандартный логин пользователя внутри Ланит
   * @param password стандартный пароль пользователя внутри Ланит
   */
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<any>(`${environment.apiUrl}/login`, null, {
      params: {username, password},
    }).pipe(
      map(() => {
        this.authSubject.next(true);
        localStorage.setItem('username', username);
        return {success: true};
      }),
      catchError(this.handleError(
        'Login',
        {
          success: false,
          error: 'Проверьте корректность введенных данных, а так же проверьте статус подключения cisco vpn Ланит'
        })
      ));
  }

  /**
   * Завершение авторизованного сеанса
   */
  logout(): void {
    this.authSubject.next(false);
    localStorage.removeItem('username');
  }

  /**
   * Добавление подписки на статус авторизации
   * authSubject = true => получаем роли текущего пользователя
   */
  addAuthSubscription(): void {
    this.authSubject.subscribe(isAuthenticated => {
      localStorage.setItem('isAuth', String(isAuthenticated));
      if (!isAuthenticated) {
        this.rolesSubject.next([]);
      } else if (!this.rolesSubject.getValue().length) {
        this.getUserRoles().subscribe((roles: string[]) => this.rolesSubject.next(roles));
      }
    });
  }

  /**
   * Получения списка ролей авторизованного пользователя
   */
  getUserRoles(): Observable<string[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/user/roles`).pipe(
      map((res) => res.map((role) => role.authority)),
      catchError(this.handleError('Login', []))
    );
  }

  /**
   * Добавление подписки на роли пользователя
   * для проверки является ли пользоваетль администратором
   */
  addRolesSubscription(): void {
    this.rolesSubject.subscribe(roles => {
      localStorage.setItem('roles', JSON.stringify(roles));
    });
  }
}
