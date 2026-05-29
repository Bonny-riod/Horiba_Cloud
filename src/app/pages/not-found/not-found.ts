import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "not-found",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./not-found.html",
  styleUrls: ["./not-found.css"]
})
export class NotFound {}
