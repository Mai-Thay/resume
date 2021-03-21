/**
 * @packageDocumentation
 * @module Models
 */
import { Injectable } from '@angular/core';
/**
 * ## Параметры фильтрации резюме
 * [[include:5.md]]
 */
@Injectable({ providedIn: 'root' })
export class ResumeFilter {
  /** Id направления вкотором работает специалист */
  profileId?: number;
  /** Массив ID тегов основных технологий по которым нужно фильтровать резбме */
  tagsIds?: Array<number>;

  /** Собирает параметры для запроса */
  get httpParams(): {[param: string]: string | string[]} {
    const params: {[param: string]: string | string[]} = {};
    if (this.profileId !== null && this.profileId !== undefined) {
     params.profileId = this.profileId.toString();
    }
    if (this.tagsIds && this.tagsIds.length) {
      params.tagsIds = this.tagsIds.map((t) => t.toString());
    }
    return params;
  }
}
