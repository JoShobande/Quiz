import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsScreen } from './results-screen';

describe('ResultsScreen', () => {
  let component: ResultsScreen;
  let fixture: ComponentFixture<ResultsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
