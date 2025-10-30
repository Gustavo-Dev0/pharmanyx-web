import { Component, signal } from '@angular/core';
import { ProductFilters } from "../../../../components/product-filters/product-filters";
import { ProductTable } from "../../../../components/product-table/product-table";
import { Button } from "../../../../shared/components/button/button";
import { Dialog } from '../../../../core/services/dialog';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Product } from '../../../../domain/products/models/product.model';
import { ProductService } from '../../../../domain/products/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductFilters, ProductTable, Button],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  productsList = signal<Product[]>([]);

  constructor(private dialog: Dialog, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((products) => this.productsList.set(products));
  }

  async onAddProduct() {

    const result = await this.dialog.open(ProductFormComponent, "Add Product");
    if(result.success) this.productService.getAll().subscribe((products) => this.productsList.set(products));

  }
}
