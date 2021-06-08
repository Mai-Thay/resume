/**
 * @packageDocumentation
 * @module Services
 */
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {plainToClass, classToPlain} from 'class-transformer';
import {environment} from '@environments/environment';
import {ResumeFilter, Pagination, Resume, PagedResumesResponse} from '@app/_models';
import {Observable} from 'rxjs';
import {BaseService} from '@app/_services/base.service';

/**
 * ## Сервис для работы с резюме
 */
@Injectable({providedIn: 'root'})
export class ResumesService extends BaseService {
  /**
   * Получение списка резюме
   * @param paging
   * @param filter
   */
  getList(paging: Pagination = null, filter: ResumeFilter = null): Observable<PagedResumesResponse> {
    const options = {
      params: {...paging?.httpParams, ...filter?.httpParams}
    };
    return this.http.get<PagedResumesResponse>(`${environment.apiUrl}/api/document`, options)
      .pipe(
        map(response => plainToClass(PagedResumesResponse, response)),
        catchError(this.handleError('getResumes', []))
      );
  }

  /**
   * Получение детальной информации о резюме
   * @param id
   */
  getById(id: number): Observable<Resume> {
    return this.http.get<any>(`${environment.apiUrl}/api/document/${id}`)
      .pipe(
        map(response => {
          return plainToClass(Resume, response);
        }),
        catchError(this.handleError('getResumeItem', {}))
      );
  }

  /**
   * Получение резюме по айди пользователя
   * @param userId
   */
  getResumeByUser(userId: string): Observable<Resume> {
    return this.http.get<any>(`${environment.apiUrl}/api/document`, {params: {userId}})
      .pipe(
        map(response => {
          return response.result.length ? plainToClass(Resume, response.result[0]) : new Resume();
        }),
        catchError(this.handleError('getResumes', []))
      );
  }

  update(resume: Resume): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/document`, classToPlain(resume));
  }
}
