/**
 * @packageDocumentation
 * @module AppModule
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import { Role } from '@app/_enums';

const IMAGE_PATH = '../assets/background/';

// tslint:disable-next-line:component-selector
@Component({ selector: 'app', templateUrl: './app.component.html' })

export class AppComponent {
    currentUser: User;
    bg: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe(x => this.currentUser = x);
        this.bg = `url(${IMAGE_PATH + Math.ceil((Math.random() * 7) + 1) + '.jpg'})`;
    }

    isAdmin(): boolean {
      return this.currentUser.role === Role.Admin;
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
