import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCard } from './device-card/device-card';

describe('DeviceCard', () => {
  let component: DeviceCard;
  let fixture: ComponentFixture<DeviceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
