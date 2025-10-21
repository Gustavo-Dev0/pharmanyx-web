import { Component } from '@angular/core';
import { ProductFilters } from "../../../components/product-filters/product-filters";
import { ProductTable } from "../../../components/product-table/product-table";
import { AddProductButton } from "../../../components/add-product-button/add-product-button";

@Component({
  selector: 'app-products-page',
  imports: [ProductFilters, ProductTable, AddProductButton],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css'
})
export class ProductsPage {

}
