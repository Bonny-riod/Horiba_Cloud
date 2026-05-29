import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "global-filters",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule
  ],
  templateUrl: "./global-filters.html",
  styleUrls: ["./global-filters.css"]
})
export class GlobalFilters {

  deviceTypes = ["All", "Air", "Water"];
  connectivity = ["All", "connected", "disconnected"];

  selectedDevice = "All";
  selectedConnectivity = "All";

  dateRange = {
    start: "",
    end: ""
  };
}
