import { Component } from '@angular/core';

@Component({
  selector: 'app-tiempo-produccion',
  standalone: true,
  template: `
    <div class="p-4">
      <h1 class="mb-4"><i class="bi bi-clock me-2"></i>Tiempo de Producción</h1>
      <p>Production time dashboard.</p>
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Average Time</h5>
              <p class="card-text display-6">3.2 days</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Tasks</h5>
              <p class="card-text display-6">147</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TiempoProduccionComponent {}
