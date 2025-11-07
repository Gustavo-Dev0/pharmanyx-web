import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastType } from '../../shared/components/toast/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  private idCounter = 0;

  getToasts(): Observable<Toast[]> {
    return this.toastSubject.asObservable();
  }

  show(message: string, type: ToastType, duration: number = 5000, persistent: boolean = false) {
    const newToast: Toast = {
      id: this.idCounter++,
      message,
      type,
      duration,
      persistent
    };

    this.toasts = [...this.toasts, newToast];
    this.toastSubject.next(this.toasts);

    if (!persistent && duration > 0) {
      setTimeout(() => {
        this.remove(newToast.id);
      }, duration);
    }
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.toastSubject.next(this.toasts);
  }

  success(message: string, duration?: number, persistent?: boolean) {
    this.show(message, 'success', duration, persistent);
  }

  error(message: string, duration?: number, persistent: boolean = true) {
    this.show(message, 'error', duration, persistent);
  }

  info(message: string, duration?: number, persistent?: boolean) {
    this.show(message, 'info', duration, persistent);
  }

  warning(message: string, duration?: number, persistent?: boolean) {
    this.show(message, 'warning', duration, persistent);
  }
}
