/**
 * @packageDocumentation
 * @module ResumesList
 */
import { Component, OnInit } from '@angular/core';
import { User, Resume, Tag, Profile, Pagination, ResumeFilter, PagedResumesResponse } from '@app/models';
import { ResumesService, AuthenticationService, TagsService, ProfilesService } from '@app/services';
import { Router } from '@angular/router';

/**
 * ## Домашняя страница
 */
@Component({ templateUrl: './resume-list.component.html' })
export class ResumeListComponent implements OnInit {
  resumes: Resume[] = [];
  tags: Tag[];
  profiles: Profile[];

  constructor(
    private profilesService: ProfilesService,
    private resumesService: ResumesService,
    private tagsService: TagsService,
    public resumesPagination: Pagination,
    public resumesFilter: ResumeFilter,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resumesPagination.onChange = this.resumesFilter.onSubmit = () => this.getResumes();
    this.getResumes();
    this.tagsService.getList().subscribe((result: Tag[]) => {
      this.tags = result;
    });
    this.profilesService.getList().subscribe((result: Profile[]) => {
      this.profiles = result;
    });
  }

  getResumes(): void {
    this.resumesPagination.isLoading = true;
    this.resumesService.getList(this.resumesPagination, this.resumesFilter).subscribe((result: PagedResumesResponse) => {
      this.resumesPagination.isLoading = false;
      this.resumes = result.items;
      this.resumesPagination.total = result.total;
      this.resumesFilter.responseTags = result.tags;
    });
  }

  goToResume(resume: Resume): void {
    this.router.navigate(['resume', resume.id ]);
  }
}
