import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { PackageCard } from '../package-card/package-card';
import { OptimizationResult } from '../../shared/models/package.model';

@Component({
  selector: 'app-optimization-results',
  standalone: true,
  imports: [CommonModule, PackageCard],
  templateUrl: './optimization-results.html',
})
export class OptimizationResults {
  readonly result = input<OptimizationResult | null>();
  readonly budget = input.required<number>();

  readonly activeTab = signal<'combination' | 'single'>('combination');
  readonly Math = Math;

  readonly remainingBudget = computed(() => {
    const res = this.result();
    return res ? this.budget() - res.totalPrice : this.budget();
  });

  readonly budgetUsage = computed(() => {
    const res = this.result();
    return res ? (res.totalPrice / this.budget()) * 100 : 0;
  });

  formatVolume(volume: number): string {
    if (volume >= 1024) {
      return `${(volume / 1024).toFixed(1)} GB`;
    }
    return `${volume} MB`;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US').format(price);
  }
}
