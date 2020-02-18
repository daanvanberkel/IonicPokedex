import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemonMapPage } from './pokemon-map.page';

describe('PokemonMapPage', () => {
  let component: PokemonMapPage;
  let fixture: ComponentFixture<PokemonMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
