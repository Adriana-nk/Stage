import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service'; // ✅ importer la classe correcte

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService); // ✅ injecter ProductService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
