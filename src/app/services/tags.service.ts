/**
 * @packageDocumentation
 * @module Services
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Tag } from '@app/models';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '@app/services/base.service';
import {classToPlain, plainToClass} from 'class-transformer';

/**
 * ## Сервис для работы с Тегами
 */
@Injectable({ providedIn: 'root' })
export class TagsService extends BaseService{
  getList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiUrl}/api/tag`).pipe(
      map(response => plainToClass(Tag, response)),
      catchError(this.handleError('getTags', []))
    );
  }

  add(tag: Tag): Observable<Tag> {
    return  this.http.post<any>(`${environment.apiUrl}/api/tag`, classToPlain(tag)).pipe(
      map(response => plainToClass(Tag, response)),
      catchError(this.handleError('getTags', null))
    );
  }
}
