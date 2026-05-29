import { Component, Input } from '@angular/core';
// import { GaugeChartComponent } from '../gauge-chart/gauge-chart';

@Component({
  selector: 'kpi-tile',
  standalone: true,
  // imports:[GaugeChartComponent],
  templateUrl: './kpi-tile.html',
  styleUrls: ['./kpi-tile.css']
})
export class KpiTile {
  @Input() label!: string;
  @Input() value!: number | string;
  @Input() color: string = '#2371C7'; // Default HORIBA blue
}
