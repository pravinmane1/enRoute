import { TestBed } from '@angular/core/testing';

import { AirportsApiService } from './airports-api.service';

describe('AirportsApiService', () => {
  let service: AirportsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AirportsApiService] });
    service = TestBed.inject(AirportsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
