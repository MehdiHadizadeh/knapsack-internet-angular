import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly _message = signal<string | null>(null);
  private readonly _isError = signal<boolean>(false);

  readonly message = this._message.asReadonly();
  readonly isError = this._isError.asReadonly();
  readonly showToast = computed(() => !!this._message());

  showError(message: string): void {
    this._message.set(message);
    this._isError.set(true);
    this.scheduleHide();
  }

  showSuccess(message: string): void {
    this._message.set(message);
    this._isError.set(false);
    this.scheduleHide();
  }

  hide(): void {
    this._message.set(null);
    this._isError.set(false);
  }

  private scheduleHide(): void {
    setTimeout(() => this.hide(), 3000);
  }
}
