import { Component } from '@angular/core';

@Component({
  selector: 'app-respuestas-promedio',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4"><i class="bi bi-graph-up me-2"></i>Respuestas Promedio</h1>
      <p>Average response time dashboard.</p>
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Response Time</h5>
              <p class="card-text display-6">1.8 hrs</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Satisfaction</h5>
              <p class="card-text display-6">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RespuestasPromedioComponent {}
