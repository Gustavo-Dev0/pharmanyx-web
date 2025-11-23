import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast } from './toast.model';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts$!: Observable<Toast[]>;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toasts$ = this.toastService.getToasts();
  }

  remove(id: number) {
    this.toastService.remove(id);
  }

  getToastClasses(toast: Toast): string {
    const classes = [
      'toast',
      `toast-${toast.type}`
    ];
    return classes.join(' ');
  }
}
