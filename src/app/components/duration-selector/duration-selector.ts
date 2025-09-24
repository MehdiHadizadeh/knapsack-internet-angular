import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-duration-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './duration-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationSelector {
  readonly selectedDurations = input.required<string[]>();
  readonly durationSelectionChange = output<string[]>();

  readonly durationOptions = ['1', '3', '7', '15', '30', '60', '90', '120', '180', '365'];

  toggleDuration(duration: string): void {
    const currentSelection = this.selectedDurations();
    const newSelection = currentSelection.includes(duration)
      ? currentSelection.filter(d => d !== duration)
      : [...currentSelection, duration];

    this.durationSelectionChange.emit(newSelection);
  }
}
