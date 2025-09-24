import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ISPConfig } from '../../shared/models/package.model';

@Component({
  selector: 'app-isp-selector',
  imports: [CommonModule],
  templateUrl: './isp-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IspSelector {
  readonly selectedIsps = input.required<ISPConfig[]>();
  readonly ispSelectionChange = output<ISPConfig[]>();

  readonly isps = [
    {
      id: 'irancell',
      name: 'ایرانسل',
      logo: 'img/irancell-logo.png',
      simType: [
        { id: 'TDLTE', label: 'TDLTE' },
        { id: 'prepaid', label: 'اعتباری' },
        { id: 'permanent', label: 'دائمی' },
      ]
    },
    {
      id: 'mci',
      name: 'همراه اول',
      logo: 'img/MCI-logo.png',
      simType: [
        { id: 'prepaid', label: 'اعتباری' },
        { id: 'permanent', label: 'دائمی' }
      ]
    },
    {
      id: 'rightel',
      name: 'رایتل',
      logo: 'img/rightel-logo.png',
      simType: [
        { id: 'prepaid', label: 'اعتباری' },
        { id: 'permanent', label: 'دائمی' }
      ]
    },
    {
      id: 'shatelmobile',
      name: 'شاتل موبایل',
      logo: 'img/shatel-logo.png',
      simType: [
        { id: 'prepaid', label: 'اعتباری' },
      ]
    },
  ];

  readonly selectedConfigs = signal<ISPConfig[]>([]);

  ngOnInit(): void {
    this.selectedConfigs.set(this.selectedIsps());
  }

  isSelected = (ispId: string): boolean =>
    this.selectedConfigs().some(c => c.isp === ispId);

  selectedSimType = (ispId: string): string =>
    this.selectedConfigs().find(c => c.isp === ispId)?.simType ?? '';

  toggleISP(isp: { id: string; simType: { id: string; label: string }[] }): void {
    if (this.isSelected(isp.id)) {
      // Deselect ISP
      this.selectedConfigs.set(this.selectedConfigs().filter(c => c.isp !== isp.id));
    } else {
      // Activate ISP → pick first simType as default
      const defaultSimType = isp.simType.length > 0 ? isp.simType[0].id : '';
      this.selectedConfigs.set([...this.selectedConfigs(), { isp: isp.id, simType: defaultSimType }]);
    }
    this.ispSelectionChange.emit(this.selectedConfigs());
  }

  /** Select sim type (activates ISP if not already active) */
  selectSimType(ispId: string, simType: string): void {
    if (this.isSelected(ispId)) {
      this.selectedConfigs.update(configs =>
        configs.map(c => (c.isp === ispId ? { ...c, simType } : c)),
      );
    } else {
      this.selectedConfigs.set([...this.selectedConfigs(), { isp: ispId, simType }]);
    }
    this.ispSelectionChange.emit(this.selectedConfigs());
  }
}
