import { CommonModule } from '@angular/common';
import { Component, EventEmitter, output, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type Status = 'any' | 'active' | 'inactive';

export interface ProductFiltersInterface {
  query: string;
  laboratory: string;
  status: Status;
}

@Component({
  selector: 'app-product-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.css',
})
export class ProductFilters {
  // estado local con Signals
  query = signal('');
  laboratory = signal('any');
  status = signal<Status>('any');

  filtersChange = output<ProductFiltersInterface>();

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly DEBOUNCE_MS = 250;

  private emitFilters() {
    this.filtersChange.emit({
      query: this.query(),
      laboratory: this.laboratory(),
      status: this.status(),
    });
  }

  onInputChange() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.emitFilters();
      this.debounceTimer = null;
    }, this.DEBOUNCE_MS);
  }

  onFilterChange() {
    this.applyNow();
  }

  applyNow() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.emitFilters();
  }

  reset() {
    this.query.set('');
    this.laboratory.set('any');
    this.status.set('any');
    this.applyNow();
  }
}
