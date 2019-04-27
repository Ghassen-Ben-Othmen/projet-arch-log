import { TestBed } from '@angular/core/testing';

import { UserVotesService } from './user-votes.service';

describe('UserVotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserVotesService = TestBed.get(UserVotesService);
    expect(service).toBeTruthy();
  });
});
