import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'

export type StockStatus = 'any' | 'in_stock' | 'low' | 'out';

export interface ProductFiltersInterface {
  query: string;
  category: string;
  supplier: string;
  stockStatus: StockStatus;
}


@Component({
  selector: 'app-product-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.css'
})
export class ProductFilters {
  // estado local con Signals
  query = signal('');
  category = signal('any');
  supplier = signal('any');
  stockStatus = signal<StockStatus>('any');

  @Output() filtersChange = new EventEmitter<ProductFiltersInterface>();

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly DEBOUNCE_MS = 250;

  private emitFilters() {
    this.filtersChange.emit({
      query: this.query(),         // 👈 obtener el valor, no el signal
      category: this.category(),
      supplier: this.supplier(),
      stockStatus: this.stockStatus(),
    });
  }

  onInputChange() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.emitFilters();
      this.debounceTimer = null;
    }, this.DEBOUNCE_MS);
  }

  applyNow() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.emitFilters();
  }

  reset() {
    this.query.set('');
    this.category.set('any');
    this.supplier.set('any');
    this.stockStatus.set('any');
    this.applyNow();
  }
}
