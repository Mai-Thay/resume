/**
 * @packageDocumentation
 * @module Models
 */
import { Expose } from 'class-transformer';

/**
 * ##Теги (ключевые навыки, технологии)
 */
export class Tag {
  @Expose({ name: 'id' })
  value: string;
  @Expose({ name: 'value' })
  display: string;
}
