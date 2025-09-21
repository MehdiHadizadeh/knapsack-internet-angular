import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-input',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './budget-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetInput {
  readonly budget = input.required<number>();
  readonly budgetChange = output<number>();

  readonly presetBudgets = [50000, 100000, 150000, 200000];

  handleBudgetChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    this.budgetChange.emit(isNaN(value) ? 0 : value);
  }

  selectPresetBudget(amount: number): void {
    this.budgetChange.emit(amount);
  }
}
