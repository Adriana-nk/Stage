import { TestBed } from '@angular/core/testing';

import { Inscription3Service } from './inscription3.service';

describe('Inscription3Service', () => {
  let service: Inscription3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inscription3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
