import { TestBed } from '@angular/core/testing';

import { BidResolverService } from './bid-resolver.service';

describe('BidResolverService', () => {
  let service: BidResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
