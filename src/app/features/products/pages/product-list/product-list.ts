import { Component, signal } from '@angular/core';
import { ProductFilters, ProductFiltersInterface } from "../../components/product-filters/product-filters";
import { ProductTable } from "../../../../components/product-table/product-table";
import { Button } from "../../../../shared/components/button/button";
import { Dialog } from '../../../../core/services/dialog';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Product } from '../../../../domain/products/models/product.model';
import { ProductService } from '../../../../domain/products/services/product.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-product-list',
  imports: [ProductFilters, ProductTable, Button, PaginationComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  productsList = signal<Product[]>([]);
  currentPage = signal(1);
  totalItems = signal(0);
  filters = signal<ProductFiltersInterface | undefined>(undefined);

  constructor(private dialog: Dialog, private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {

    this.productService.getAll(this.filters(), this.currentPage()).subscribe((response) => {
      this.productsList.set(response.content);
      this.totalItems.set(response.totalElements);
    });
  }

  async onAddProduct() {

    const result = await this.dialog.open(ProductFormComponent, "Add Product");
    if(result.success) this.loadProducts();

  }

  onFiltersChange(filters: ProductFiltersInterface) {
    this.filters.set(filters);
    this.currentPage.set(1);
    this.loadProducts();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadProducts();
  }
}
