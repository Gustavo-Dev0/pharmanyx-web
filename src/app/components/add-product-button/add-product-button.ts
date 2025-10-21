import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product-button',
  imports: [],
  template: `<button
  (click)="onAddProduct()"
  class="flex items-center gap-2 px-4 h-10 rounded-DEFAULT bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90 active:scale-95 transition-transform"
>
  <span class="material-symbols-outlined text-lg">add_circle</span>
  Add Product
</button>
`,
  styleUrl: './add-product-button.css'
})
export class AddProductButton {
  onAddProduct() {
    // Aquí podrías abrir un modal, redirigir a un formulario, etc.
    console.log('Add Product clicked!');
  }
}
