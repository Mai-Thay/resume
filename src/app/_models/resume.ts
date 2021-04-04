/**
 * @packageDocumentation
 * @module Models
 */
import { Type } from 'class-transformer';
import { User } from './user';
import { Tag } from './tag';
import { Profile } from './profile';
import { CommonExperience } from './common-experience';
import { getDurationString } from '@app/_helpers';
import {LanitExperience} from '@app/_models/lanit-experience';

/**
 * ## Резюме сотрудника
 * [[include:4.md]]
 */
export class Resume {
  id: number;

  @Type(() => User)
  user: User;

  @Type(() => Tag)
  tags?: Tag[];
  name?: string;
  secondName?: string;
  lastName?: string;
  birthday?: string;
  location?: string;
  emails?: string[];
  phones?: number[];
  telegram?: string;
  skype?: string;

  @Type(() => Profile)
  profile?: Profile;

  @Type(() => CommonExperience)
  commonExperience?: CommonExperience[];

  @Type(() => LanitExperience)
  lanitExperience?: LanitExperience[];

  getFIO(): string {
    return `${this.lastName} ${this.name[0]}. ${this.secondName[0]}.`;
  }

  getCommonExperienceDuration(): string {
    const diff = this.commonExperience?.map((e) => e.getDurationInDays()).reduce((a, b) => a + b , 0);
    return getDurationString(diff);
  }
}
