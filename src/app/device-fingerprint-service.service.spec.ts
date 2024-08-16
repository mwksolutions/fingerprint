import { TestBed } from '@angular/core/testing';

import { DeviceFingerprintServiceService } from './device-fingerprint-service.service';

describe('DeviceFingerprintServiceService', () => {
  let service: DeviceFingerprintServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceFingerprintServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
