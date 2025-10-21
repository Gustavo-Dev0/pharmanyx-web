import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      class="flex items-center gap-2 px-4 h-10 rounded-DEFAULT bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90 active:scale-95 transition-transform"
    >
      @if (icon()) {
        <span class="material-symbols-outlined text-lg">{{ icon() }}</span>
      }
      {{ label() }}
    </button>
  `
})
export class Button {
  label = input<string>('');
  icon = input<string | undefined>();
}
