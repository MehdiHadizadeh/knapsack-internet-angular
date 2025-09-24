// src/app/core/services/optimization.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptimizationParams, OptimizationResult } from '../../shared/models/package.model.js';

@Injectable({
  providedIn: 'root', // This service is a singleton available throughout the app
})
export class OptimizationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.trafit.ir/api';

  findOptimalPackages(params: OptimizationParams): Observable<OptimizationResult> {
    const httpParams = new HttpParams()
      .set('isp', JSON.stringify(params.ispConfigs))
      .set('duration', params.durations.join(','))
      .set('timeframe', params.timeframes.join(','))
      .set('budget', params.budget.toString());

    return this.http.get<OptimizationResult>(`${this.apiUrl}/knapsack_new`, { params: httpParams });
  }
}