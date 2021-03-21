/**
 * @packageDocumentation
 * @module Models
 */
import { Type } from 'class-transformer';
import { Resume } from './resume';
/** ## Список резюме с потсраничной разбивкой (модель ответа от севера)
 * [[include:1.md]]
 */
export  class PagedResumesResponse {
  /** Всего элесентов */
  total: number;
  /** Номер текущей страницы */
  page: number;
  /** Элементов на странице */
  perPage: number;
  @Type(() => Resume)
  /** Массив элементов */
  items: Resume[];
}
