/**
 * @packageDocumentation
 * @module Services
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Tag } from '@app/_models';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '@app/_services/base.service';
import { plainToClass } from 'class-transformer';

/** ## Сервис для работы с Тегами
 * [[include:21.md]]
 */
@Injectable({ providedIn: 'root' })
export class TagsService extends BaseService{
  getList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiUrl}/tags`).pipe(
      map(response => plainToClass(Tag, response)),
      catchError(this.handleError('getTags', []))
    );
  }
}
