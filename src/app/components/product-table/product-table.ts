import { NgFor } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { Product } from '../../domain/products/models/product.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-table',
  imports: [NgFor, JsonPipe],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css'
})
export class ProductTable {

  tableHeaders = ['Product Code', 'Product Name','Laboratory','Sanitary Registry','Purchase Price','Requires Prescription','Actions'];

  productsList = input<Product[]>([]);

  /* products = signal([
    { name: 'Pain Relief Tablets', category: 'Analgesics', supplier: 'MediCorp', stock: 75, price: 9.99 },
    { name: 'Antibiotic Capsules', category: 'Antibiotics', supplier: 'HealthPlus', stock: 20, price: 14.5 },
    { name: 'Allergy Medication', category: 'Antihistamines', supplier: 'AllergoMed', stock: 90, price: 12.75 },
  ]); */

  updateProducts(){
    window.URL.canParse("sec")
  }
}
