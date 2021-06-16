/**
 * @packageDocumentation
 * @module Services
 */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {environment} from '@environments/environment';

/**
 * ## Базовый класс для сервиса
 */
@Injectable({ providedIn: 'root' })
export class BaseService {
  constructor(protected http: HttpClient) { }

  protected handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      if (environment.logLevel === 'console') {
        console.error(operation, error);
      }
      return of(result as T);
    };
  }
}
