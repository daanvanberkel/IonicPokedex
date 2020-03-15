import { TestBed } from '@angular/core/testing';

import { MyPokemonService } from './my-pokemon.service';

describe('MyPokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyPokemonService = TestBed.get(MyPokemonService);
    expect(service).toBeTruthy();
  });
});
