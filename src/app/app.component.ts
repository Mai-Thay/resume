import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

// tslint:disable-next-line:component-selector
@Component({ selector: 'app', templateUrl: 'app.component.html' })

export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe(x => this.currentUser = x);
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
