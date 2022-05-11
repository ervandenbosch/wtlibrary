import { TestBed } from '@angular/core/testing';

import { ExemplaarService } from './exemplaar.service';

describe('UserDataService', () => {
  let service: ExemplaarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExemplaarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
