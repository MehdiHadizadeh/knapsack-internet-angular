import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-optimization-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './optimization-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizationButton {
  readonly isLoading = input.required<boolean>();
  readonly optimizeClick = output<void>();

  onOptimizeClick(): void {
    this.optimizeClick.emit();
  }
}
