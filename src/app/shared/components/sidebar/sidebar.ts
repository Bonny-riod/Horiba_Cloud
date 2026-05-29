import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {

  constructor(private router: Router) {}

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  public isActive(path: string): boolean {
    if (path === '') {
      return this.router.url === '/';
    }
    return this.router.url.startsWith('/' + path);
  }
}