/**
 * @packageDocumentation
 * @module Models
 */

import {Type} from 'class-transformer';
import {Company} from './company';
import {getDurationString} from '@app/helpers';

/**
 * ## Описание опыта на всех рабочих местах
 */
export class CommonExperience {
  beginDate: string = '';
  endDate: string = '';
  @Type(() => Company)
  company: Company = new Company();
  position: string = '';
  description: string = '';

  /**
   * Получение корректной даты начала
   */
  getFormattedDateBegin(): Date {
    const date = this.beginDate.split('.').length === 2 ? this.beginDate.split('.').join('.01.') : this.beginDate;
    return new Date(date);
  }

  /**
   * Получение корректной даты окончания
   */
  getFormattedDateEnd(): Date {
    if (this.endDate) {
      const date = this.endDate?.split('.').length === 2 ? this.endDate.split('.').join('.30.') : this.endDate;
      return new Date(date);
    }
  }

  /**
   * Получение строки отформатированного периода работы в годах и месяцах
   */
  getDurationString(): string {
    const diff = this.getDurationInDays();
    return getDurationString(diff);
  }

  /**
   * Получение срока работы в днях
   */
  getDurationInDays(): number {
    const diff = Math.floor(this.getFormattedDateEnd()?.getTime() || new Date().getTime()) - this.getFormattedDateBegin().getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
}
