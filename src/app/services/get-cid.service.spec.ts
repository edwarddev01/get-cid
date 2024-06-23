import { TestBed } from '@angular/core/testing';

import { GetCidService } from './get-cid.service';

describe('GetCidService', () => {
  let service: GetCidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
