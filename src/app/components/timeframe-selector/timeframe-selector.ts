import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-timeframe-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeframe-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeframeSelector {
  readonly selectedTimeframes = input.required<string[]>();
  readonly timeframeSelectionChange = output<string[]>();

  private sanitizer = inject(DomSanitizer);

  readonly timeframeOptions = [
    { id: '24H', name: '24 ساعته', color: 'bg-green-500', icon: 'clock' },
    { id: '2AM-7AM', name: 'شبانه (۲ بامداد تا ۷ صبح)', color: 'bg-indigo-500', icon: 'moon' },
    { id: '6AM-12PM', name: 'روزانه (۶ صبح تا ۱۲ ظهر)', color: 'bg-yellow-500', icon: 'sun' },
    { id: '1AM-11AM', name: 'نامحدود (۱ بامداد تا ۱۱ صبح)', color: 'bg-gray-500', icon: 'infinity' },
  ];

  toggleTimeframe(timeframeValue: string): void {
    const currentSelection = this.selectedTimeframes();
    const newSelection = currentSelection.includes(timeframeValue)
      ? currentSelection.filter(t => t !== timeframeValue)
      : [...currentSelection, timeframeValue];

    this.timeframeSelectionChange.emit(newSelection);
  }

  getIconPath(icon: string): SafeHtml {
    const icons: Record<string, string> = {
      clock: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
      moon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />',
      sun: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />',
      infinity: '<path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"/>'
    };    
    return this.sanitizer.bypassSecurityTrustHtml(icons[icon] || '');
  }
}