import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductFiltersInterface } from '../../../features/products/components/product-filters/product-filters';

export interface ProductResponse {
  content: Product[],
  pageable: {
    pageNumber: number,
    "pageSize": number,
    "sort": {
      "empty": boolean,
      "sorted": boolean,
      "unsorted": boolean
    },
    "offset": number,
    "paged": boolean,
    "unpaged": boolean
  },
  "last": boolean,
  "totalElements": number,
  "totalPages": number,
  "size": number,
  "number": number,
  "sort": {
    "empty": boolean,
    "sorted": boolean,
    "unsorted": boolean
  },
  "first": boolean,
  "numberOfElements": number,
  "empty": boolean
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/products';

  getAll(filters?: ProductFiltersInterface, page: number = 1): Observable<ProductResponse> {
    let params = new HttpParams();
    if (filters) {
      if (filters.query) {
        params = params.append('query', filters.query);
      }
      if (filters.laboratory && filters.laboratory !== 'any') {
        params = params.append('laboratory', filters.laboratory);
      }
      if (filters.status && filters.status !== 'any') {
        params = params.append('status', filters.status);
      }
    }
    params = params.append('page', (page - 1).toString());
    return this.http.get<ProductResponse>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  //find by name
  findByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?name=${name}`);
  }

  /* delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  } */
}
