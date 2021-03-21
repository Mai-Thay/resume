/**
 * @packageDocumentation
 * @module HomePage
 */
import {Component, OnInit} from '@angular/core';
import {User, Resume, Tag, Profile, Pagination, ResumeFilter} from '@app/_models';
import {ResumesService, AuthenticationService, TagsService, ProfilesService} from '@app/_services';
import {FormBuilder, FormGroup} from '@angular/forms';

/** ## Домашняя страница
 * [[include:11.md]]
 */
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  filterForm: FormGroup;
  user: User;
  resumes: Resume[] = [];
  tags: Tag[];
  profiles: Profile[];

  constructor(
    private formBuilder: FormBuilder,
    private profilesService: ProfilesService,
    private resumesService: ResumesService,
    private tagsService: TagsService,
    private authenticationService: AuthenticationService,
    public resumesPagination: Pagination,
    public resumesFilter: ResumeFilter
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.resumesService.getList(this.resumesPagination).subscribe((result: Resume[]) => {
      this.resumesPagination.isLoading = false;
      this.resumes = result;
    });
    this.tagsService.getList().subscribe((result: Tag[]) => {
      this.tags = result;
    });
    this.profilesService.getList().subscribe((result: Profile[]) => {
      this.profiles = result;
    });

    this.filterForm = this.formBuilder.group({
      profile: [''],
      tags: ['']
    });
  }

  onSubmit(): void {

  }
}
