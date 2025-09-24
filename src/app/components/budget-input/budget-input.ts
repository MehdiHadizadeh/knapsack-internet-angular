import { ChangeDetectionStrategy, Component, input, output, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DecimalPipe],
  templateUrl: './budget-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetInput {
  readonly budget = input.required<number>();
  readonly budgetChange = output<number>();

  readonly presetBudgets = [50000, 100000, 150000, 200000];
  private decimalPipe = inject(DecimalPipe);

  formatBudget(value: number | null): string {
    if (value == null || isNaN(value)) return '';
    return this.decimalPipe.transform(value, '1.0-0') ?? '';
  }

  handleBudgetChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value.replace(/,/g, ''); // remove commas
    const value = parseFloat(rawValue);
    this.budgetChange.emit(isNaN(value) ? 0 : value);
  }

  selectPresetBudget(amount: number): void {
    this.budgetChange.emit(amount);
  }
}
