import { Component } from '@angular/core';
import { ProductFilters } from "../../../../components/product-filters/product-filters";
import { ProductTable } from "../../../../components/product-table/product-table";
import { Button } from "../../../../shared/button/button";

@Component({
  selector: 'app-product-list',
  imports: [ProductFilters, ProductTable, Button],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  onAddProduct() {
    // Aquí podrías abrir un modal, redirigir a un formulario, etc.
    console.log('Add Product clicked!');
  }
}
