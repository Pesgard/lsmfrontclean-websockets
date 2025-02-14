import { TestBed } from '@angular/core/testing';
import { DictionaryUseCaseService } from './dictionary-use-case.service';

describe('DictionaryUseCaseService', () => {
  let service: DictionaryUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
