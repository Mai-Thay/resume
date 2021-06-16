/**
 * @packageDocumentation
 * @module Models
 */
import {Type} from 'class-transformer';
import {Tag} from './tag';
import {Profile} from './profile';
import {ResumeExtra} from './resume-extra';

/**
 * ## Резюме сотрудника
 */
export class Resume {
  id?: string;
  userId?: string;
  @Type(() => Tag)
  tags?: Tag[];
  @Type(() => Profile)
  profiles?: Profile[];
  @Type(() => ResumeExtra)
  extra?: ResumeExtra;

  constructor() {
    this.id = localStorage.getItem('username');
    this.userId = localStorage.getItem('username');
    this.tags = [];
    this.profiles = [null];
    this.extra = new ResumeExtra();
  }
}
