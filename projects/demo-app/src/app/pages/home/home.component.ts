import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4">🏠 Home</h1>
      <p class="lead">Welcome to the ngx-boost-sidebar-menu demo app.</p>
      <p>Select a page from the sidebar to navigate.</p>
      <div class="alert alert-info mt-4">
        <i class="bi bi-info-circle"></i>
        This sidebar is responsive. Resize your browser to see it become an overlay on mobile.
      </div>
    </div>
  `,
})
export class HomeComponent {}
