/**
 * @packageDocumentation
 * @module Models
 */
import {Expose, Type} from 'class-transformer';
import { Resume } from './resume';
import {Tag} from '@app/models/tag';

/**
 * ## Список резюме с потсраничной разбивкой (модель ответа от севера)
 */
export  class PagedResumesResponse {
  /** Всего элесентов */
  @Expose({ name: 'totalItems' })
  total: number;
  @Type(() => Resume)
  @Expose({ name: 'result' })
  /** Массив элементов */
  items: Resume[];
  /** Теги включенные в фильтрацию */
  tags: Array<string>;
}
