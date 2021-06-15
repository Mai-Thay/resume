/**
 * @packageDocumentation
 * @module AppModule
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services';
import {Router, NavigationEnd, ActivatedRoute, ResolveEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

const IMAGE_PATH = '../assets/background/';

@Component({selector: 'app-resume', templateUrl: './app.component.html'})

export class AppComponent implements OnInit {
  showHeader: boolean;
  bg: string;
  title: string;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof ResolveEnd)
    ).subscribe((e: ResolveEnd) => {
      this.showHeader = !e.url.includes('login');
      this.bg = e.url.includes('login') ? `url(${IMAGE_PATH + Math.ceil((Math.random() * 7) + 1) + '.jpg'})` : 'rgba(0, 0, 0, 0.05)';
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
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
