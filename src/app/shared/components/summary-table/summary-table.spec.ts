import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTable } from './summary-table';

describe('SummaryTable', () => {
  let component: SummaryTable;
  let fixture: ComponentFixture<SummaryTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
