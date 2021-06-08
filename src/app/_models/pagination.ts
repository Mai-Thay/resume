/**
 * @packageDocumentation
 * @module Models
 */
import {Injectable} from '@angular/core';

/** ## Параметры постраничной навигации и сортировки */
@Injectable({ providedIn: 'root' })
export class Pagination {
  /** Номер текущей страницы */
  private $page = 1;
  /** Элементов на странице */
  private $perPage = 10;

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
      size: this.perPage.toString(),
      perPage: this.page.toString(),
    };
    return params;
  }
}
