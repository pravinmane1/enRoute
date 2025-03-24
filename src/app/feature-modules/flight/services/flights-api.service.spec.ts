import { TestBed } from '@angular/core/testing';

import { FlightsApiService } from './flights-api.service';

describe('FlightsApiService', () => {
  let service: FlightsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FlightsApiService] });
    service = TestBed.inject(FlightsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
