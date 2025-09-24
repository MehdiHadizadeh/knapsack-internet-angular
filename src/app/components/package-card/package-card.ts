import { CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Package } from '../../shared/models/package.model';
import { OperatorFaPipe } from '../../shared/pipes/operator-fa-pipe';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe, OperatorFaPipe],
  templateUrl: './package-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageCard {
  readonly package = input.required<Package>();

  getOperatorBorderColor(operator: string): string {
    const colors: Record<string, string> = {
      'irancell': 'border-r-yellow-400',
      'mci': 'border-r-cyan-500',
      'shatelmobile': 'border-r-blue-500',
      'rightel': 'border-r-fuchsia-500',
    };
    return colors[operator.toLowerCase()] || 'border-r-gray-400';
  }

  getTimeframeBadgeColor(timeframe: string): string {
    const colors: Record<string, string> = {
      '24H': 'bg-green-500',
      '2AM-7AM': 'bg-indigo-500',
      '6AM-12PM': 'bg-yellow-500',
      '1AM-11AM': 'bg-gray-500',
      '2H': 'bg-orange-500'
    };
    return colors[timeframe] || 'bg-gray-500';
  }

  getTimeframeBadgeText(timeframe: string): string {
    const texts: Record<string, string> = {
      '24H': '24 ساعته',
      '2AM-7AM': 'شبانه',
      '6AM-12PM': 'روزانه',
      '1AM-11AM': 'نامحدود',
      '2H': '2 ساعته'
    };
    return texts[timeframe] || timeframe;
  }

  formatVolume(volume: number): string {
    if (volume >= 1024) {
      return `${(volume / 1024)} گیگابایت`;
    }
    return `${volume} مگابایت`;
  }

  getEfficiency(volume: number, price: number): string {
    return (price / (volume / 1024)).toFixed(0);
  }
}
