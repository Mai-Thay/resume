/**
 * @packageDocumentation
 * @module Services
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Profile } from '@app/_models';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '@app/_services/base.service';
import { plainToClass } from 'class-transformer';

/**
 * ## Сервис для работы с направлениями деятельности сотрудников
 */
@Injectable({ providedIn: 'root' })
export class ProfilesService extends BaseService{
  getList(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.apiUrl}/api/profile`).pipe(
      map(response => plainToClass(Profile, response)),
      catchError(this.handleError('getProfiles', []))
    );
  }
}
