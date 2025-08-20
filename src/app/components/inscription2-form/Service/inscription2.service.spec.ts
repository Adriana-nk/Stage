import { TestBed } from '@angular/core/testing';

import { Inscription2Service } from './inscription2.service';

describe('Inscription2Service', () => {
  let service: Inscription2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inscription2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
