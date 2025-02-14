import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessplayComponent } from './guessplay.component';

describe('GuessplayComponent', () => {
  let component: GuessplayComponent;
  let fixture: ComponentFixture<GuessplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
