/**
 * @packageDocumentation
 * @module AppModule
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/services';
import {Router, ResolveEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

const IMAGE_PATH = '../assets/background/';

@Component({selector: 'app-resume', templateUrl: './app.component.html'})

export class AppComponent implements OnInit {
  bg: string;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
  ) {  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof ResolveEnd)
    ).subscribe((e: ResolveEnd) => {
      this.bg = e.url.includes('login') ? `url(${IMAGE_PATH + Math.ceil((Math.random() * 7) + 1) + '.jpg'})` : 'rgba(0, 0, 0, 0.05)';
    });
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
