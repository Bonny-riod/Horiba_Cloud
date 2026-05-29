import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Header } from './shared/components/header/header';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Header],
  
  template: `
  <div class="app-container">
    <sidebar></sidebar>

    <div class="main-section">
      <app-header></app-header>

      <div class="page-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./app.css']
})
export class App {}
