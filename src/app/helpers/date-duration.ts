/**
 * @packageDocumentation
 * @module Components
 */

import {numWords} from '@app/helpers/num-words';

export function getDurationString(diff: number): string {
  const years = Math.floor(diff / 31 / 12);
  const months = Math.floor(diff / 31 - years * 12);
  return `${years ? years + ' ' : ''}` +
    `${years ? numWords(years, ['год ', 'года ', 'лет ']) : ''}` +
    `${months ? months + ' ' : (!years ? 'менее месяца' : '')}${months ? numWords(months, ['месяц', 'месяца', 'месяцев']) : ''}`;
}
