import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SummaryRow } from "../../../models/analytics.model";

@Component({
  selector: "summary-table",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./summary-table.html",
  styleUrls: ["./summary-table.css"]
})
export class SummaryTable {
  @Input() data: SummaryRow[] = [];
}
