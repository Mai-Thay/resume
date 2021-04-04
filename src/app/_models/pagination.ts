/**
 * @packageDocumentation
 * @module Models
 */
import {SortDir} from '@app/_enums';
import {Injectable} from '@angular/core';

/** ## Параметры постраничной навигации и сортировки
 * [[include:2.md]]
 */
@Injectable({ providedIn: 'root' })
export class Pagination {
  /** Номер текущей страницы */
  private $page = 1;
  /** Элементов на странице */
  private $perPage = 10;

  /** Имя поля по которому должна осущетсвляться сортировка */
  sortBy?: string;

  /** Направление сотрировки */
  sortDir?: SortDir;

  /** Общее количество элементов списка */
  total = 0;

   /** Идентификатор загрузки */
  isLoading = true;

  /** Варианты отображения элементов на странице */
  perPageVariants = [5, 10, 20, 30];

  /** Коллбэк выполняемый при обновлении страницы/сортировки/колличества элементов на тсранице */
  onChange = (): void => {};

  get page(): number {
    return this.$page;
  }

  set page(page: number) {
    this.$page = page;
    this.onChange();
  }

  get perPage(): number {
    return this.$perPage;
  }

  set perPage(perPage: number) {
    this.$perPage = perPage;
    this.onChange();
  }

  /** Собирает параметры для запроса */
  get httpParams(): {[param: string]: string | string[]} {
    const params: {[param: string]: string | string[]} = {
      page: this.page.toString(),
      perPage: this.perPage.toString(),
    };
    if (this.sortBy) {
      params.sortBy = this.sortBy;
      params.sortDir = !!this.sortDir ? SortDir[this.sortDir] : SortDir.asc;
    }
    return params;
  }

  /** Переключает сортировку */
  switchSort(sortBy: string): void {
    if (this.sortBy !== sortBy) {
      this.sortBy = sortBy;
      this.sortDir = SortDir.asc;
    } else {
      this.sortDir = SortDir.desc === this.sortDir ? SortDir.asc : SortDir.desc;
    }
    this.onChange();
  }

  /** Очищает параметры сорировки */
  clearSort(): void {
    this.sortBy = null;
    this.sortDir = null;
  }

  /**
   * Проверяет направление сортировки для заданного поля сортировки
   * @param name
   */
  checkSortBy(name: string): string {
    if (name === this.sortBy) {
      return this.sortDir;
    } else {
      return '';
    }
  }
}
