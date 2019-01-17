import { TestBed } from '@angular/core/testing';

import { ReservoirService } from './reservoir.service';

describe('ReservoirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservoirService = TestBed.get(ReservoirService);
    expect(service).toBeTruthy();
  });
});
