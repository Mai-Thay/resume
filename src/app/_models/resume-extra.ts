/**
 * @packageDocumentation
 * @module Models
 */

import {Type} from 'class-transformer';
import {CommonExperience} from './common-experience';
import {LanitExperience} from '@app/_models/lanit-experience';
import {getDurationString} from '@app/_helpers';

export class ResumeExtra {
  name: string = '';
  secondName: string = '';
  lastName: string = '';
  birthday: string = '';
  location: string = '';
  emails: string[] = [''];
  phones: number[] = [null];
  telegram: string = '';
  skype: string = '';

  @Type(() => CommonExperience)
  commonExperience: CommonExperience[] = [new CommonExperience()];

  @Type(() => LanitExperience)
  lanitExperience: LanitExperience[] = [new LanitExperience()];

  getFIO(): string {
    return `${this.lastName} ${this.name[0]}. ${this.secondName[0]}.`;
  }

  getCommonExperienceDuration(): string {
    const diff = this.commonExperience?.map((e) => e.getDurationInDays()).reduce((a, b) => a + b , 0);
    return getDurationString(diff);
  }

  addCommonExperience(): void {
    this.commonExperience.push(new CommonExperience());
  }

  addLanitExperience(): void {
    this.lanitExperience.push(new LanitExperience());
  }

  addNewEmailField(): void {
    this.emails.push(null);
  }

  addNewPhoneField(): void {
    this.phones.push(null);
  }
}
