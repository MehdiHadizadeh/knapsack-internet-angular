import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-isp-selector',
  imports: [CommonModule],
  templateUrl: './isp-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IspSelector {
  readonly selectedIsps = input.required<string[]>();
  readonly ispSelectionChange = output<string[]>();

  readonly isps = [
    { id: 'irancell', name: 'ایرانسل', logo: 'img/irancell-logo.png' },
    { id: 'mci', name: 'همراه اول', logo: 'img/MCI-logo.png' },
  ];

  onIspChange(ispName: string): void {
    const currentSelection = this.selectedIsps();
    const newSelection = currentSelection.includes(ispName)
      ? currentSelection.filter(isp => isp !== ispName)
      : [...currentSelection, ispName];

    this.ispSelectionChange.emit(newSelection);
  }
}
