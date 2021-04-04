/**
 * @packageDocumentation
 * @module Services
 */
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { environment } from '@environments/environment';
import { ResumeFilter, Pagination, Resume, PagedResumesResponse } from '@app/_models';
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
    return this.http.get<PagedResumesResponse>(`${environment.apiUrl}/resumes`, options)
      .pipe(
        map(response => plainToClass(PagedResumesResponse, response)),
        catchError(this.handleError('getResumes', []))
      );
  }

  getById(id: number): Observable<Resume> {
    return  this.http.get<Resume>(`${environment.apiUrl}/resume`, {params: {id: id.toString()}})
      .pipe(
        map(response => {
          console.log(response)
          return plainToClass(Resume, response)
        }),
        catchError(this.handleError('getResumeItem', {}))
      );
  }
}
