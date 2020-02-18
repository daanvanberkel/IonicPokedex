import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPokemonPage } from './my-pokemon.page';

describe('MyPokemonPage', () => {
  let component: MyPokemonPage;
  let fixture: ComponentFixture<MyPokemonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPokemonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
