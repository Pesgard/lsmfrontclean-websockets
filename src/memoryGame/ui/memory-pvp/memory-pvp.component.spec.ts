import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryPvpComponent } from './memory-pvp.component';

describe('MemoryPvpComponent', () => {
  let component: MemoryPvpComponent;
  let fixture: ComponentFixture<MemoryPvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryPvpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryPvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
