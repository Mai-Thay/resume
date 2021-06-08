/**
 * @packageDocumentation
 * @module AppModule
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services';
import {User} from '@app/_models';
import {Role} from '@app/_enums';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';

const IMAGE_PATH = '../assets/background/';

@Component({selector: 'app-resume', templateUrl: './app.component.html'})

export class AppComponent implements OnInit {
  isAuth: boolean;
  bg: string;
  title: string;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.authenticationService.authSubject.subscribe(x => this.isAuth = x);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.bg = this.route.root.firstChild.snapshot.data?.colored ? `url(${IMAGE_PATH + Math.ceil((Math.random() * 7) + 1) + '.jpg'})` : 'rgba(0, 0, 0, 0.05)';
      this.title = this.route.root.firstChild.snapshot.data.title;
    });
  }

  /**
   * Завершение авторизованного сеанса
   */
  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Проверка на соответсвие текущего роута определенному условию
   *
   * @param {string} route
   * @returns
   */
  hasRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
