import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFilters } from './global-filters';

describe('GlobalFilters', () => {
  let component: GlobalFilters;
  let fixture: ComponentFixture<GlobalFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
