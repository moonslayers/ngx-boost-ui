import { Component } from '@angular/core';

@Component({
  selector: 'app-career',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4"><i class="bi bi-calendar-event me-2"></i>Career</h1>
      <p>Career timeline and milestones.</p>
      <ul class="list-group mt-3">
        <li class="list-group-item">2024 - Senior Developer</li>
        <li class="list-group-item">2022 - Full Stack Developer</li>
        <li class="list-group-item">2020 - Junior Developer</li>
      </ul>
    </div>
  `,
})
export class CareerComponent {}
