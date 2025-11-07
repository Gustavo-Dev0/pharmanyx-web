import { NgFor } from '@angular/common';
import { Component, inject, input } from '@angular/core';
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

  /* products = signal([
    { name: 'Pain Relief Tablets', category: 'Analgesics', supplier: 'MediCorp', stock: 75, price: 9.99 },
    { name: 'Antibiotic Capsules', category: 'Antibiotics', supplier: 'HealthPlus', stock: 20, price: 14.5 },
    { name: 'Allergy Medication', category: 'Antihistamines', supplier: 'AllergoMed', stock: 90, price: 12.75 },
  ]); */

  updateProducts(){
    window.URL.canParse("sec")
  }

  onViewInInventory(id: number) {
    /* this.router.navigate(['/inventory', id]); */
  }
}
