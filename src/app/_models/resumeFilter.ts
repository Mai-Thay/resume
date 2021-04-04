/**
 * @packageDocumentation
 * @module Models
 */
import { Injectable } from '@angular/core';
import { Tag } from '@app/_models';
/**
 * ## Параметры фильтрации резюме
 * [[include:5.md]]
 */
@Injectable({ providedIn: 'root' })
export class ResumeFilter {
  /** Id направления вкотором работает специалист */
  profile?: number;
  /** Массив тегов основных технологий по которым нужно фильтровать резбме */
  tags?: Array<Tag>;

  /** Массив ID тегов для подсветки */
  responseTags?: Array<number>;

  /** Выполнить по сабмиту */
  onSubmit = (): void => {};

  /** Собирает параметры для запроса */
  get httpParams(): {[param: string]: string | string[]} {
    const params: {[param: string]: string | string[]} = {};
    if (this.profile !== null && this.profile !== undefined) {
     params.profile = this.profile.toString();
    }
    if (this.tags && this.tags.length) {
      params.tags = this.tags.map((t) => t.value.toString());
    }
    return params;
  }

  /** Проверяем есть был ли тег добавлен только что, или по нему уже отфильтрованы значения */
  isInResponse(tag: Tag): boolean {
    return !!this.responseTags?.filter(t => t === tag.value).length;
  }
}
