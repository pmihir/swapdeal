import { TestBed } from '@angular/core/testing';

import { UriServiceService } from './uri-service.service';

describe('UriServiceService', () => {
  let service: UriServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UriServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
