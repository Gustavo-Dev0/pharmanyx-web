import { Component } from '@angular/core';
import { ProductFilters } from "../../../../components/product-filters/product-filters";
import { ProductTable } from "../../../../components/product-table/product-table";
import { Button } from "../../../../shared/components/button/button";
import { Dialog } from '../../../../core/services/dialog';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductFilters, ProductTable, Button],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  constructor(private dialog: Dialog) {}

  onAddProduct() {

    this.dialog.open(ProductFormComponent, "Add Product");
  }
}
