import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsGraph } from './analytics-graph';

describe('AnalyticsGraph', () => {
  let component: AnalyticsGraph;
  let fixture: ComponentFixture<AnalyticsGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
