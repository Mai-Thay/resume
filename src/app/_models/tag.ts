/**
 * @packageDocumentation
 * @module Models
 */
import { Expose } from 'class-transformer';

/**
 * ##Теги (ключевые навыки, технологии)
 * [[include:6.md]]
 */
export class Tag {
  @Expose({ name: 'id' })
  value: number;
  @Expose({ name: 'value' })
  display: string;
}
