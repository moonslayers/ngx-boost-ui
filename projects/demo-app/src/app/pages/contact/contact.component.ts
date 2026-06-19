import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4"><i class="bi bi-envelope me-2"></i>Contact</h1>
      <p>Contact information and form.</p>
      <div class="card mt-3">
        <div class="card-body">
          <p><strong>Email:</strong> moonslayers@example.com</p>
          <p><strong>Location:</strong> Cloud City</p>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {}
