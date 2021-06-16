/**
 * @packageDocumentation
 * @module Models
 */
import { Injectable } from '@angular/core';
import { Tag } from '@app/models';
/**
 * ## Параметры фильтрации резюме
 */
@Injectable({ providedIn: 'root' })
export class ResumeFilter {
  /** Id направления вкотором работает специалист */
  profile?: number = null;
  /** Массив тегов основных технологий по которым нужно фильтровать резбме */
  tags?: Array<Tag> = null;

  /** Массив ID тегов для подсветки */
  responseTags?: Array<string> = null;

  /** Выполнить по сабмиту */
  onSubmit = (): void => {};

  /** Собирает параметры для запроса */
  get httpParams(): {[param: string]: string | string[]} {
    const params: {[param: string]: string | string[]} = {};
    if (this.profile !== null && this.profile !== undefined) {
     params.profilesIn = this.profile.toString();
    }
    if (this.tags && this.tags.length) {
      params.tagsIn = this.tags.map((t) => t.value.toString());
    }
    return params;
  }

  /** Проверяем есть был ли тег добавлен только что, или по нему уже отфильтрованы значения */
  isInResponse(tag: Tag): boolean {
    return !!this.responseTags?.filter(t => t === tag.value).length;
  }

  clear(): void {
    this.profile = null;
    this.tags = null;
    this.responseTags = null;
    this.onSubmit();
  }
}
