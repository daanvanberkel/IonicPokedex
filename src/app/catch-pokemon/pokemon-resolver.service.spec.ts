import { TestBed } from '@angular/core/testing';

import { PokemonResolverService } from './pokemon-resolver.service';

describe('PokemonResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonResolverService = TestBed.get(PokemonResolverService);
    expect(service).toBeTruthy();
  });
});
