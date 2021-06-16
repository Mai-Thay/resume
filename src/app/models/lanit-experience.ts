/**
 * @packageDocumentation
 * @module Models
 */
import { Type } from 'class-transformer';
import { Tag } from './tag';

/**
 * ## Описание опыта на всех рабочих местах
 */
export class LanitExperience {
  project: string = '';
  position: string = '';
  @Type(() => Tag)
  tags: Tag[] = [];
}
