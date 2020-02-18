import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokedexPage } from './pokedex.page';

describe('PokedexPage', () => {
  let component: PokedexPage;
  let fixture: ComponentFixture<PokedexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokedexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
