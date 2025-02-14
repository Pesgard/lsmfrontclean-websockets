import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryLocalComponent } from './memory-local.component';

describe('MemoryLocalComponent', () => {
  let component: MemoryLocalComponent;
  let fixture: ComponentFixture<MemoryLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryLocalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
