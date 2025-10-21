import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-product-table',
  imports: [NgFor],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css'
})
export class ProductTable {
  products = signal([
    { name: 'Pain Relief Tablets', category: 'Analgesics', supplier: 'MediCorp', stock: 75, price: 9.99 },
    { name: 'Antibiotic Capsules', category: 'Antibiotics', supplier: 'HealthPlus', stock: 20, price: 14.5 },
    { name: 'Allergy Medication', category: 'Antihistamines', supplier: 'AllergoMed', stock: 90, price: 12.75 },
  ]);

  updateProducts(){
    window.URL.canParse("sec")
  }
}
