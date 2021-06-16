/**
 * @packageDocumentation
 * @module Components
 */

export function numWords(n: number, titles: string[]): string {
  const index = n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  return titles[index];
}