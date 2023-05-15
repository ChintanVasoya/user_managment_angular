import { TestBed } from '@angular/core/testing';

import { ConstantserviceService } from './constantservice.service';

describe('ConstantserviceService', () => {
  let service: ConstantserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
