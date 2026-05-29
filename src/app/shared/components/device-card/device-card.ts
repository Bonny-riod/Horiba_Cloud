import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Device } from "../../../models/device.model";

@Component({
  selector: "device-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./device-card.html",
  styleUrls: ["./device-card.css"]
})
export class DeviceCard {
  @Input() device!: Device;
}
