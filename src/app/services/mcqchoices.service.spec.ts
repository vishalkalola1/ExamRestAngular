import { TestBed } from '@angular/core/testing';

import { McqchoicesService } from './mcqchoices.service';

describe('McqchoicesService', () => {
  let service: McqchoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McqchoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
