import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4"><i class="bi bi-folder me-2"></i>Projects</h1>
      <p>Project management section.</p>
      <div class="list-group mt-3">
        <div class="list-group-item">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Project Alpha</h5>
            <small>Active</small>
          </div>
          <p class="mb-1">Description of Project Alpha.</p>
        </div>
        <div class="list-group-item">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Project Beta</h5>
            <small>Completed</small>
          </div>
          <p class="mb-1">Description of Project Beta.</p>
        </div>
      </div>
    </div>
  `,
})
export class ProjectsComponent {}
