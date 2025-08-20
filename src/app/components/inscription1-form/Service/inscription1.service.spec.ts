import { TestBed } from '@angular/core/testing';

import { Inscription1Service } from './inscription1.service';

describe('Inscription1Service', () => {
  let service: Inscription1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inscription1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
