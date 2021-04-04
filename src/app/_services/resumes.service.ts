/**
 * @packageDocumentation
 * @module Services
 */
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { environment } from '@environments/environment';
import { ResumeFilter, Pagination, PagedResumesResponse } from '@app/_models';
import { Observable } from 'rxjs';
import { BaseService } from '@app/_services/base.service';

/** ## Сервис для работы с резюме
 * [[include:20.md]]
 */
@Injectable({ providedIn: 'root' })
export class ResumesService extends BaseService {
  getList(paging: Pagination = null, filter: ResumeFilter = null): Observable<PagedResumesResponse> {
    const options = {
      params: {...paging?.httpParams, ...filter?.httpParams}
    };
    console.log(options)
    return this.http.get<PagedResumesResponse>(`${environment.apiUrl}/resumes`, options)
      .pipe(
      map(response => plainToClass(PagedResumesResponse, response)),
      catchError(this.handleError('getResumes', []))
    );
  }
}
