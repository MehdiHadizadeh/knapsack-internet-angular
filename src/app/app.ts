// src/app/app.component.ts
import { ChangeDetectionStrategy, Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ISPConfig, OptimizationParams, OptimizationResult } from './shared/models/package.model';
import { OptimizationService } from './core/services/optimization.js';
import { IspSelector } from './components/isp-selector/isp-selector';
import { DurationSelector } from './components/duration-selector/duration-selector';
import { TimeframeSelector } from './components/timeframe-selector/timeframe-selector';
import { BudgetInput } from './components/budget-input/budget-input';
import { OptimizationButton } from './components/optimization-button/optimization-button';
import { Toast } from './components/toast/toast';
import { ToastService } from './core/services/tost';
import { OptimizationResults } from './components/optimization-results/optimization-results';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    IspSelector,
    DurationSelector,
    TimeframeSelector,
    BudgetInput,
    OptimizationButton,
    OptimizationResults,
    Toast
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly selectedISPConfigs = signal<ISPConfig[]>([{ isp: 'irancell', simType: 'prepaid' }]);
  readonly selectedDurations = signal<string[]>(['30']);
  readonly selectedTimeframes = signal<string[]>(['24H']);
  readonly budget = signal<number>(100000);
  readonly results = signal<OptimizationResult | null>(null);
  readonly isLoading = signal<boolean>(false);

  private readonly optimizationService = inject(OptimizationService);
  private readonly toastService = inject(ToastService);

  onISPConfigChange(configs: ISPConfig[]): void {
    this.selectedISPConfigs.set(configs);
  }

  onDurationSelectionChange(durations: string[]): void {
    this.selectedDurations.set(durations);
  }

  onTimeframeSelectionChange(timeframes: string[]): void {
    this.selectedTimeframes.set(timeframes);
  }

  onBudgetChange(value: number): void {
    this.budget.set(value);
  }

  findOptimalPackages(): void {
    const errorMessage = this.validateSelection();
    if (errorMessage) {
      this.toastService.showError(errorMessage);
      return;
    }

    this.isLoading.set(true);
    const params: OptimizationParams = {
      ispConfigs: this.selectedISPConfigs(),
      durations: this.selectedDurations(),
      timeframes: this.selectedTimeframes(),
      budget: this.budget(),
    };

    this.optimizationService.findOptimalPackages(params).subscribe({
      next: (data) => {
        this.results.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching results:', error);
        this.results.set(null);
        this.isLoading.set(false);
        this.toastService.showError('بسته ای یافت نشد');
      }
    });
  }

  private validateSelection(): string | null {
    if (!this.selectedISPConfigs().length) {
      return 'لطفاً یک اپراتور اینترنت را انتخاب کنید.';
    }
    if (!this.selectedDurations().length) {
      return 'لطفاً مدت زمان بسته را انتخاب کنید.';
    }
    if (!this.selectedTimeframes().length) {
      return 'لطفاً بازه زمانی را مشخص کنید.';
    }
    if (!this.budget() || this.budget() <= 0) {
      return 'لطفاً یک بودجه معتبر وارد کنید.';
    }
    return null;
  }
}
