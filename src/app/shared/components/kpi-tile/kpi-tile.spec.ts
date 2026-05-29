import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiTile } from './kpi-tile';

describe('KpiTile', () => {
  let component: KpiTile;
  let fixture: ComponentFixture<KpiTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
