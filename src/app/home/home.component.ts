/**
 * @packageDocumentation
 * @module HomePage
 */
import { Component, OnInit } from '@angular/core';
import { User, Resume, Tag, Profile, Pagination, ResumeFilter, PagedResumesResponse } from '@app/_models';
import { ResumesService, AuthenticationService, TagsService, ProfilesService } from '@app/_services';
import { Router } from '@angular/router';

/** ## Домашняя страница
 * [[include:11.md]]
 */
@Component({ templateUrl: './home.component.html' })
export class HomeComponent implements OnInit {
  user: User;
  resumes: Resume[] = [];
  tags: Tag[];
  profiles: Profile[];

  constructor(
    private profilesService: ProfilesService,
    private resumesService: ResumesService,
    private tagsService: TagsService,
    private authenticationService: AuthenticationService,
    public resumesPagination: Pagination,
    public resumesFilter: ResumeFilter,
    private router: Router
  ) {
    this.user = this.authenticationService.userValue;
  }

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
