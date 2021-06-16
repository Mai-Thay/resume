/**
 * @packageDocumentation
 * @module Login
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { LoginResponse } from '@app/models';

/**
 * Форма авторизации
 */
@Component({templateUrl: './login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.rolesSubject.subscribe(x => !!x && this.router.navigate([this.authenticationService.userMainUrl]));
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formFields(): any {
    return this.loginForm.controls;
  }

  onSubmit(): null {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.formFields.username.value, this.formFields.password.value)
      .subscribe((response: LoginResponse) => {
        if (!response.success) {
          this.error = response.error;
          this.loading = false;
        }
      });
  }
}
