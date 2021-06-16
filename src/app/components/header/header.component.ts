/**
 * @packageDocumentation
 * @module Components
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ResolveEnd, Router} from '@angular/router';
import {AuthenticationService} from '@app/services';
import {filter} from 'rxjs/operators';

/**
 * ## Компонент header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  showHeader: boolean;
  title: string;

  constructor(private router: Router,
              public authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof ResolveEnd)
    ).subscribe((e: ResolveEnd) => {
      this.showHeader = !e.url.includes('login');
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

}
