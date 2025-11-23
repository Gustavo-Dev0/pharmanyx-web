import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Product } from '../../domain/products/models/product.model';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  imports: [JsonPipe],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css'
})
export class ProductTable {

  private router = inject(Router);

  tableHeaders = ['Product Code', 'Product Name','Laboratory','Sanitary Registry','Purchase Price','Requires Prescription','Actions'];

  productsList = input.required<Product[]>();

  @Output() edit = new EventEmitter<Product>();
  @Output() view = new EventEmitter<Product>();

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onView(product: Product) {
    this.view.emit(product);
  }

  onViewInInventory(id: number) {
    /* this.router.navigate(['/inventory', id]); */
  }
}
