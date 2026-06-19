import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4"><i class="bi bi-person me-2"></i>Profile</h1>
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3 mb-3">
            <i class="bi bi-person-circle fs-1"></i>
            <div>
              <h5 class="mb-1">Moonslayers</h5>
              <p class="text-secondary mb-0">Admin</p>
            </div>
          </div>
          <p>This is the profile page. The sidebar footer links here.</p>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent {}
