import { Component, output, signal } from '@angular/core';


export interface ResultModal {
  success: boolean;
  data?: any;
  reason?: string;
}

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  close = output<ResultModal>();
  title = signal<string>('');


  onClose(result: ResultModal) {
    console.log(result);
    this.close.emit(result);
  }
}

