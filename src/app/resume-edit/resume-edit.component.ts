/**
 * @packageDocumentation
 * @module ResumeEdit
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService, ProfilesService, ResumesService, TagsService} from '@app/services';
import {Profile, Resume, Tag} from '@app/models';

/**
 * ## Компонент формы редактирования/создания резюме
 */
@Component({
  selector: 'app-resume-edit',
  templateUrl: './resume-edit.component.html',
})
export class ResumeEditComponent implements OnInit {
  resume: Resume;
  tags: Tag[];
  profiles: Profile[];
  isSending: boolean = false;

  constructor(private resumeService: ResumesService,
              private authService: AuthenticationService,
              private profilesService: ProfilesService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.resumeService.getResumeByUser(this.authService.userName).subscribe((resume: Resume) => {
      this.resume = resume;
    });
    this.tagsService.getList().subscribe((result: Tag[]) => {
      this.tags = result;
    });
    this.profilesService.getList().subscribe((result: Profile[]) => {
      this.profiles = result;
    });
  }

  /**
   * Сохранение резюме
   */
  saveResume(): void {
    if (!this.isSending) {
      this.isSending = true;
      this.resume.userId = localStorage.getItem('username');
      this.resume.id = localStorage.getItem('username');
      this.resumeService.update(this.resume).subscribe(res => {
        setTimeout(() => {
          this.isSending = false;
        }, 500);
      });
    }
  }

  compare(a: Profile, b: Profile): boolean {
    return a?.id === b?.id;
  }

  /**
   * Коллбек отрабатывающий при событии добавления тега
   * если тега нет в базе, создается новый
   * @param tag
   */
  onAddTag(tag: Tag | any): void {
    if (!this.tags.filter(t => t.value === tag.value).length) {
      this.tagsService.add(tag).subscribe((res: Tag) => {
        this.tags.push(res);
      });
    }
  }
}
