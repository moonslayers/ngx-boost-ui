import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4"><i class="bi bi-grid me-2"></i>Dashboard</h1>
      <p>Main dashboard page content.</p>
      <div class="row mt-4">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Users</h5>
              <p class="card-text display-6">1,234</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Active Sessions</h5>
              <p class="card-text display-6">567</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Revenue</h5>
              <p class="card-text display-6">$89K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
