import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  close = output<void>();
  title = signal<string>('');


  onClose() {
    this.close.emit();
  }
}

