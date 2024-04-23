import { TestBed } from '@angular/core/testing';

import { BallotAccessService } from './ballot-access.service';

describe('BallotAccessService', () => {
  let service: BallotAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallotAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
